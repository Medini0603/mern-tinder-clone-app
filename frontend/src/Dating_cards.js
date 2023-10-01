import React,{useState,useEffect} from "react"
import DatingCard from 'react-tinder-card'
import './Dating_cards.css'
import axios from "./axios"

const Dating_cards =()=>{
    const [people, setPeople] = useState([]);

    useEffect(() => {
      async function fetchData() {
        try {
          const req = await axios.get("/dating/cards");
          setPeople(req.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
            fetchData()
        },[]);
    
    const swiped=(direction,nameToDelete)=>{
        console.log("Receiving"+nameToDelete);
    };

    const outOfFrame=(name)=>{
        console.log(name+"left the screen");
    };
    return(
        <div className="Dating_cards">
            <div className="Dating_cards_container">
                {
                    people.map((person)=>(
                        <DatingCard className="swipe"
                            key={person.name}
                            preventSwipe={['up','down']}
                            onSwipe={(dir)=>swiped(dir,person.name)}
                            onCardLeftScreen={()=>outOfFrame(person.name)}>
                            <div style={{backgroundImage:`url(${person.imgURL})`}}className="cards">
                                <h3>{person.name}</h3>
                            </div>
                        </DatingCard>

// {/* <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>Hello, World!</TinderCard> */}

                    ))
                }
            </div>
        </div>
    );
}
export default Dating_cards