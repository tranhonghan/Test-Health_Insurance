/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React , {Component} from 'react'
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Dimensions,Image} from 'react-native'
import {ActionSheet,Root} from "native-base";
import ImagePicker from 'react-native-image-crop-picker';

const width = Dimensions.get('window').width;

class Camera extends Component {
  constructor(props){
    super(props);
    this.state={
      fileList: []
    }
 }

  onSelectedImage = (image) => {
    let newDataImg = this.state.fileList;
    const source = {uri:image.path};
    let item = {
      id: Data.now(),
      url:source,
      content: image.data
    };
    newDataImg.push(item);
    this.setState({fileList:newDataImg})
  };

  takePhotoFromCamera = () => {
      ImagePicker.openCamera({
        compressImageMaxWidth:500,
        compressImageMaxHeight:500,
        compressImageQuality	: 0.7,
        cropping:false,
        includeBase64: true
      }).then(image => {
        console.log('takePhotoFromCamera: ',image);
        this.onSelectedImage(image);
      });
  };

  choosePhotoFromLibrary =() => {
      ImagePicker.openPicker({
        compressImageMaxWidth	: 500,
        compressImageMaxHeight	: 500,
        compressImageQuality	: 0.7,
        cropping:false,
        includeBase64: true
      }).then(image => {
        console.log('choosePhotoFromLibrary: ',image);
        this.onSelectedImage(image);
      });
  };

  onClickAddImage = () => {
    const BUTTONS = ['Take Photo','Choose Photo Library','Cancel'];
    ActionSheet.show(
     {options: BUTTONS,
         cancelButtonIndex: 2,
         title: 'Select a Photo'},
           buttonIndex => {
        switch (buttonIndex){
          case 0:
            this.takePhotoFromCamera();
            break;
          case 1:
            this.choosePhotoFromLibrary();
            break;
          default:
            break

        }
      }
    )
  };

  renderItem = ({item,index}) => {
    let {itemViewImage, itemImage} = styles;
    return(
      <View style={itemViewImage} >
        <Image source={item.url} style={itemImage}/>
      </View>
    )
  };

  render(){
    let {content,btnPressStyle,txtStyle} = styles;
    let {fileList} = this.state;
    return(
      <Root>
        <View style = {content} >
          <text>Health Insurance</text>
          <FlatList
            data={fileList}
            renderItem={this.renderItem}
            keyExtractor={(item,index) => index.toString()}
            extraData={this.state}
          />
          <TouchableOpacity onPress={this.onClickAddImage} style={btnPressStyle}>
             <Text style={txtStyle}>Press Add Image</Text>
          </TouchableOpacity>
        </View>
      </Root>
    );
  }
}
const styles = StyleSheet.create({
  content:{
    flex: 1,
    alignItems: 'center',
    marginTop:50,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 30
  },
  btnPressStyle:{
    backgroundColor: '#0080ff',
    height: 50,
    width: width - 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtStyle:{
    color: '#ffffff'
  } ,
  itemImage:{
    backgroundColor: '#2F455C',
    height: 150,
    width: width - 60,
    borderRadius: 8,
    resizeMode: 'contain'
  },
  itemViewImage: {
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10
  }
});

export default Camera;