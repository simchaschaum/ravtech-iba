import {useEffect} from 'react';
import Tree from './components/tree/tree';
import PictureWidget from './components/pictureWidget/pictureWidget';
import DetailsWidget from './components/detailsWidget/detailsWidget';
import { setElements } from './actions/setElements';
import { connect } from 'react-redux';

function App({setElements}) {

  useEffect(()=>getElements());
 
  const getElements = async () => {
    const response = await fetch('https://random-data-api.com/api/users/random_user?size=10');
    if(!response.ok){
      let message = `Sorry! An error has occured. ${response.status}`;
      throw new Error(message);
    } else {
      const data = await response.json();
      setElements(data);  
    }
  }
 
  return (
      <div id="app">
        <header id="topHeader"></header>
        <div id="contents-container">
          <Tree/>
          <div id="infoWidgets">
            <PictureWidget />
            <DetailsWidget />
          </div>
        </div>
      </div>
    
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setElements: (elements) => dispatch(setElements(elements)),
      }
}

export default connect(null, mapDispatchToProps)(App);
