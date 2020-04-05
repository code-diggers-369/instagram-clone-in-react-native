import React from 'react';
import { TextInput, ActivityIndicator, TouchableOpacity, Button, TouchableHighlight, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { f, auth, database, storage } from '../../config/config';
// import * as ImagePicker from 'expo-image-picker';
import ImagePicker from 'react-native-image-picker';
import UserAuth from '../components/auth';

class upload extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            loggedin: false,
            imageId: this.uniqueId(),
            imageSelected: false,
            uploading: false,
            caption: '',
            progress: 0,
            filePath: {},
        };
    }

    chooseFile = async() => {
        var options = {
            title: 'Select Image',
            // customButtons: [
            //     { name: 'customOptionKey', title: 'Other' },
            //   ],
              storageOptions: {
                skipBackup: true,
                path: 'images',
              },
        };
        let result = await ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);
       
            if (response.didCancel) {
              console.log('User cancelled image picker');
              this.setState({
                imageSelected: false
              });
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
              this.setState({
                imageSelected: false
              });
            }
            //    else if (response.customButton) {
            //   console.log('User tapped custom button: ', response.customButton);
            //   alert('Sorry This Feture Is Not Supported On Your Device');
            // } 
                else {
              let source = response;
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
              this.setState({
                filePath: source,
                imageSelected: true,
                imageId: this.uniqueId(),
                uri: response.uri,
              });
            //   this.uploadImage(response.uri);
            }
          });
    };

    // _checkPermissions = async () => {
    //     const { status } = await Permissions.askAsync(Permissions.CAMERA);
    //     this.setState({camera: status});

    //     const { statusRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //     this.setState({cameraRoll: statusRoll});
    // }

    s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    uniqueId = () => {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + 
        this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }

    // findNewImage = async() => {
    //     // this._checkPermissions();

    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: 'Images',
    //         allowsEditing: true,
    //         quality: 1/2
    //     });

    //     console.log(result);

    //     if(!result.cancelled){

    //         console.log('Upload Image');
    //         this.setState({
    //             imageSelected: true,
    //             imageId: this.uniqueId(),
    //             uri: result.uri
    //         });
    //         //this.uploadImage(result.uri);
    //     }else{
    //         console.log('Cancel');
    //         this.setState({
    //             imageSelected: false
    //         });
    //     }
    // }

    uploadPublish = () => {
        if(this.state.uploading == false){
        if(this.state.caption != ''){
            //
            this.uploadImage(this.state.uri);
        }else{
            alert('Please Enter Caption..');
        }
    }else{
        console.log('Ignore Button Tap As Already Uploading');
        alert('You Have Already Tap Publish');
    }
    }

    uploadImage = async (uri) => {
        //
        var that = this;
        var userId = f.auth().currentUser.uid;
        var imageId = this.state.imageId;

        var re = /(?:\.([^.]+))?$/;
        var ext =  re.exec(uri)[1];
        this.setState({
            currentFileType: ext,
            uploading: true
        });

        const response = await fetch(uri);
        const blob = await response.blob();
        var FilePath = imageId+'.'+that.state.currentFileType;

        var uploadTask = storage.ref('user/'+userId+'/img').child(FilePath).put(blob);

        uploadTask.on('state_changed', function(snapshot){
            var progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
            console.log('Upload is '+progress+'% Complete');
            that.setState({
                progress: progress,
            });
        }, function(error) {
            console.log('Error With Upload -'+ error);
        }, function(){
            //complete
            that.setState({progress: 100});
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
                console.log(downloadURL);
                that.processUpload(downloadURL);
            });
        });

    }

    processUpload = (imageUrl) => {
        //process here...

        //set needed info
        var imageId = this.state.imageId;
        var userId = f.auth().currentUser.uid;
        var caption = this.state.caption;
        var dateTime = Date.now();
        var timestamp = Math.floor(dateTime / 1000);
        //build photo object
        //author,caption,posted,url

        var photoObj = {
            author: userId,
            caption: caption,
            posted: timestamp,
            url: imageUrl
        };
        //update database

        //add to main feed
        database.ref('/photos/'+imageId).set(photoObj);  

        //set user photos object
        database.ref('/users/'+userId+'/photos/'+imageId).set(photoObj);

        alert('Image Uploaded!!');

        this.setState({
            uploading: false,
            imageSelected: false,
            caption: '',
            uri: ''
        });

    }

    componentDidMount = () => {
        var that = this;
        f.auth().onAuthStateChanged(function(user){
            if(user){
                //logged in
                that.setState({
                    loggedin: true
                });
            }else{
                //not logged in
                that.setState({
                    loggedin: false
                });
            }
        });
    }

    render()
    {
        return(
            <View style={{flex: 1}}>
                { this.state.loggedin == true ? (
                    //are logged in
                    <View style={{flex: 1}}>
                        
                        { this.state.imageSelected == true ? (
                            //check if an image is selected
                            <View style={{flex: 1}}>
                                <View style={{flexDirection: 'row', height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', justifyContent:'space-between' ,alignItems: 'center'}}>
                                      <TouchableOpacity style={{width: 100}} onPress={() => this.props.navigation.goBack()}>
                                            <Text style={{fontSize: 12, fontWeight: 'bold', paddingLeft: 10, color: 'blue'}}>Go Back</Text>
                                      </TouchableOpacity>
                                            <Text>Upload</Text>
                                    <Text style={{width: 100}}></Text>
                                </View>
                                <View style={{padding: 5}}>
                                    <Text style={{marginTop: 5}}>Caption:</Text>
                                    <TextInput 
                                        editable={true}
                                        placeholder={'Enter Your Caption...'}
                                        maxLength={150}
                                        multiline={true}
                                        numberOfLines={4}
                                        onChangeText={(text) => this.setState({caption: text})}
                                        style={{marginVertical: 10, height: 100, padding: 5, borderColor: 'grey', borderWidth: 1, borderRadius: 3, backgroundColor: 'white', color: 'black'}}
                                    />
                                    <TouchableOpacity
                                        onPress={ () => this.uploadPublish()}
                                        style={{alignSelf: 'center', width: 170, marginHorizontal: 'auto', backgroundColor: 'darkorchid', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20}}>
                                            <Text style={{textAlign: 'center', color: 'white'}}>Upload & Publish</Text>
                                    </TouchableOpacity>

                                    { this.state.uploading == true ? (
                                        <View style={{marginTop: 10}}>
                                            <Text>{ this.state.progress }%</Text>
                                            { this.state.progress != 100 ? (
                                                <ActivityIndicator size="small" color="blue" />
                                            ) : (
                                                <Text>Processing</Text>
                                            )}
                                        </View>
                                    ): (
                                        <View></View>
                                    )}

                                    <Image
                                    source={{uri: this.state.uri}}
                                    style={{marginTop: 10, resizeMode: 'cover', width: '100%', height: 275}}
                                    />

                                </View>
                            </View>
                        ) : (
                            
                        <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                            <Text style={{fontSize: 28, paddingBottom: 15}}>Upload</Text>
                                 <TouchableOpacity 
                                // onPress={() => this.findNewImage()} 
                                onPress={() => this.chooseFile()}
                                style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'blue', borderRadius: 5}}>
                                    <Text style={{color: 'white'}}>Select Photo</Text>
                                </TouchableOpacity>
                        </View>
                        
                        )}
                    </View>
                ) : (
                    //not logged in 
                    <UserAuth message={'Please Login To Upload A Photo'}/>
                )}
            </View>
        )
    }
}

export default upload;