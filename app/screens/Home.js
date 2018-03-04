import React, { Component } from 'react';
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Content,
  Title,
  Text,
  Grid,
  Row,
  Col,
  Button,
  Fab,
  Spinner,
  Item,
  Input
} from 'native-base';
import { Image } from 'react-native';

import Lightbox from 'react-native-lightbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WallPaperManager from 'react-native-wallpaper-manager';

import { unsplash } from '../utils/config';
import { toJson } from 'unsplash-js/native';

class Home extends Component {
  state = {
    data: [],
    query: 'nature',
    loading: true,
    settingImage: true
  }

  componentWillMount() {
    this.fetchPhotos();
  }

  fetchPhotos = () => {
    const {
      query
    } = this.state;

    unsplash.search.photos(query, 1, 100)
      .then(toJson)
      .then(data => {
        this.setState({ data: data.results, loading: false });
      });
  }

  setWallpaper = (url) => {
    WallPaperManager.setWallpaper({uri: url}, res => {
      if (res) {
        alert('Wallpaper is set. Enjoy!');
      }
    });
  }

  renderRows = () => {
    const {
      data
    } = this.state;

    const {
      navigator
    } = this.props.navigation;

    return data.map(item =>
      <Row key={item.id}>
        <Col style={{ marginHorizontal: 5, marginVertical: 5 }}>
          <Lightbox navigator={navigator}>
            <Image source={{
              uri: item.urls.small
            }} style={{
              flex: 1,
              height: 300,
              resizeMode: 'cover'
            }} />
          </Lightbox>
          <Fab
            onPress={() => this.setWallpaper(item.urls.regular)}
            style={{ backgroundColor: 'teal', opacity: 0.7 }}
          >
            <Icon name="wallpaper" />
          </Fab>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Left>
            <Title style={{
              color: '#fff' ,
              fontSize: 24,
              fontWeight: 'bold',
            }}>
              Unsplash
            </Title>
          </Left>
          <Body>
            <Item style={{ backgroundColor: '#fff' }}>
              <Input
                onEndEditing={() => this.fetchPhotos()}
                onChangeText={(query) => this.setState({ query })}
                placeholder="Search"
              />
              <Icon onPress={() => this.fetchPhotos()} size={24} name="search" />
            </Item>
          </Body>
        </Header>
        <Content>
            {this.state.loading ?
              <Spinner animating /> :
              <Grid>
                {this.renderRows()}
              </Grid>
            }
        </Content>
      </Container>
    );
  }
}

export default Home;
