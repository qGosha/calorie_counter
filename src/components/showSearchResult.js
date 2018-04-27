import React from 'react';
import '../style/show_search_result.css';
import { FoodListItem } from '../components/foodListItem';
import {
  ListGroup,
  ListGroupItem,
  Tab,
  Tabs,
  Image
} from 'react-bootstrap';
export const SearchResult = ({ foundFood, term }) => {
  if (!foundFood) return null;
  else {
    const foodAvatarUrl = 'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';
    const common = foundFood.common.slice(0,5);
    const branded = foundFood.branded.slice(0, 3);
    const self = foundFood.self.slice(0, 5);

    const freeformElement = (
        <ListGroupItem
        className='food-item' >
          <Image
            src={foodAvatarUrl}
            alt='food'
            className='food-image'
            />
          <div className='food-description'>
          <span className='food-name'>{ term }</span>
          </div>
       </ListGroupItem>
      )
    let freeform;
    if(common.length) {
      freeform = (common[0].food_name !== term) ? freeformElement : null;
    } else {
      freeform = freeformElement;
    }

    const foodListGroup = (title, element) => {
      return (
        <ListGroup>
           <h5 className= 'food-group-title'>{title}</h5>
           {element}
        </ListGroup>
      )
    }

    return (
      <Tabs
        defaultActiveKey={1}
        id="uncontrolled-tab-example">
        <Tab eventKey={1} title="All">
          { self.length ? foodListGroup('Your Foods', <FoodListItem foods={self} />) : null }
          { common.length ? foodListGroup('Common food', <FoodListItem foods={common} />) : null }
          { branded.length ? foodListGroup('Branded food', <FoodListItem foods={branded} />) : null }
          { freeform ? foodListGroup('Freeform', freeform) : null }
        </Tab>
        <Tab eventKey={2} title="Yor food">
          Tab 2 content
      </Tab>
        <Tab eventKey={3} title="Tab 3">
          Tab 3 content
      </Tab>
      </Tabs>
    )
  }

}


// import React from 'react';
// import '../style/show_search_result.css';
// import {
//   ListGroup,
//   ListGroupItem,
//   Tab,
//   Tabs,
//   Image
// } from 'react-bootstrap';
// export const SearchResult = ({ foundFood, term }) => {
//   if (!foundFood) return null;
//   else {
//     const foodAvatarUrl = 'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';
//     const common = foundFood.common.slice(0,5);
//     const branded = foundFood.branded.slice(0, 5);
//     const self = foundFood.self.slice(0, 5);
//
//     const freeformElement = (
//         <ListGroupItem
//         className='food-item' >
//           <Image
//             src={foodAvatarUrl}
//             alt='food'
//             className='food-image'
//             />
//           <div className='food-description'>
//           <span className='food-name'>{ term }</span>
//           </div>
//        </ListGroupItem>
//       )
//
//
//     let freeform;
//     if(common.length) {
//       freeform = (common[0].food_name !== term) ? freeformElement : null;
//     } else {
//       freeform = freeformElement;
//     }
//
//     const commonFood = common.map((commonFoodItem) => {
//       const foodName = commonFoodItem.food_name;
//       return (
//         <ListGroupItem
//         key={commonFoodItem.food_name}
//         className='food-item' >
//           <Image
//             src={commonFoodItem.photo.thumb || foodAvatarUrl}
//             alt='food'
//             className='food-image'
//             />
//           <div className='food-description'>
//           <span className='food-name'>{ foodName }</span>
//           </div>
//        </ListGroupItem>
//       )
//     })
//     const brandedFood = branded.map((brandedFoodItem) => {
//       const foodName = brandedFoodItem.food_name;
//       const brandName = brandedFoodItem.brand_name;
//       const servingQty = brandedFoodItem.serving_qty;
//       const servingUnit = brandedFoodItem.serving_unit;
//       const calorie = brandedFoodItem.nf_calories;
//       return (
//         <ListGroupItem
//           key={brandedFoodItem.food_name}
//           className='food-item' >
//           <Image
//             src={brandedFoodItem.photo.thumb || foodAvatarUrl}
//             alt='food'
//             className='food-image'
//           />
//           <div className='food-description'>
//            <div className='food-description-group-1'>
//             <span className='food-name'>{foodName}</span>
//             <span className='food-size'>{`${brandName}, ${servingQty} ${servingUnit}`}</span>
//            </div>
//            <div className='food-description-group-2'>
//             <span className='food-calorie'>{calorie}</span>
//             <span className='food-calorie-name'>cal</span>
//            </div>
//           </div>
//         </ListGroupItem>
//       )
//     })
//     return (
//       <Tabs
//         defaultActiveKey={1}
//         id="uncontrolled-tab-example"
//       >
//         <Tab eventKey={1} title="All">
//           <ListGroup>
//           <ListGroupItem>
//             {common.length ? <h5 className='food-group-title'>Common Foods</h5> : null}
//             { commonFood }
//           </ListGroupItem>
//           <ListGroupItem>
//             {branded.length ? <h5 className= 'food-group-title' > Branded food</h5> : null}
//              {brandedFood }
//           </ListGroupItem>
//             <ListGroupItem>
//               {freeform ? <h5 className='food-group-title' >Freeform</h5> : null}
//               {freeform}
//           </ListGroupItem>
//           </ListGroup>
//         </Tab>
//         <Tab eventKey={2} title="Yor food">
//           Tab 2 content
//       </Tab>
//         <Tab eventKey={3} title="Tab 3">
//           Tab 3 content
//       </Tab>
//       </Tabs>
//     )
//   }
//
// }
