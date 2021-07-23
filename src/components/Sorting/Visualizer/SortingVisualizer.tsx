import React, {Component} from 'react';
import './SortingVisualizer.css';
import Footer from '../../Footer/Footer';
import {getMergeSortAnimations} from '../Algorithms/MergeSort';
import {getQuickSortAnimations} from '../Algorithms/Quicksort';
import {getHeapSortAnimations} from '../Algorithms/HeapSort';
import {getBubbleSortAnimations} from '../Algorithms/BubbleSort';

const ANIMATION_SPEED = 5;
const PRIMARY_COLOR = '#98971a'
const SECONDARY_COLOR = '#cc241d'

export default class SortingVisualizer extends Component {
   state = {
      mainArray: [] as number[],
      arraySize: 50,
      sortingType: "mergeSort",
      steps: 0,
      showStats: false,
   }

   changeSortingType = (event: React.ChangeEvent<HTMLSelectElement>) => {
      event.preventDefault();
      this.setState({sortingType: event.target.value})
   }

   changeArraySize = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const size = Number(event.target.value);
      if (size > 0) {
         this.setState({arraySize: size});
      } else {
         this.setState({arraySize: 50});
      }
      setTimeout(this.makeNewArray, 200);
   }

   sortAnimation = (animations: any[]) => {
      for (let i = 0; i < animations.length; i++) {
         const arrayBars = document.getElementsByClassName('bar');
         const isColorChange = i % 3 !== 2;
         if (isColorChange) {
            const [barOneIndex, barTwoIndex] = animations[i];
            const barOneStyle = arrayBars[barOneIndex] as HTMLElement;
            const barTwoStyle = arrayBars[barTwoIndex] as HTMLElement;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
               barOneStyle.style.backgroundColor = color;
               barTwoStyle.style.backgroundColor = color;
            }, i * ANIMATION_SPEED)
         } else {
            setTimeout(() => {
               const [barOneIndex, newHeight] = animations[i];
               const barOneStyle = arrayBars[barOneIndex] as HTMLElement;
               barOneStyle.style.height = `${newHeight}vh`;
            }, i * ANIMATION_SPEED)
         }
      }
      
   }

   makeNewArray = () => {
      this.setState({mainArray: [] as number[]})
      var array:number[] = [];
      for (let i = 0 ;i<this.state.arraySize; i++) {
         let randomInt:number = Math.floor(Math.random() * 75)+5;
         array.push(randomInt) ;
      }
      this.setState({mainArray: array});
      var bars = document.getElementsByClassName('bar');
      for (let j = 0; j<bars.length; j++) {
         let bar = bars[j] as HTMLElement;
         bar.style.backgroundColor = '#98971a';
      }
   }

   startSort = () => {
      const method = this.state.sortingType;
      switch(method) {
         case "mergeSort":
            const mergeAnim = getMergeSortAnimations(this.state.mainArray);
            this.sortAnimation(mergeAnim);
            break;
         case "quickSort":
            const quickAnim = getQuickSortAnimations(this.state.mainArray);
            this.sortAnimation(quickAnim);
            break;
         case "heapSort":
            const heapAnim = getHeapSortAnimations(this.state.mainArray);
            this.sortAnimation(heapAnim);
            break;
         case "bubbleSort":
            const bubbleAnim = getBubbleSortAnimations(this.state.mainArray);
            this.sortAnimation(bubbleAnim);
            break;
      }
      if (method === "mergeSort") {
      }
   }

   componentDidMount() {
      this.makeNewArray();
   }

   render() {
      return(
         <div id="SortingVisualizer">
            <div id="header">
               <div id="headerLeft">
                  <input type="text" placeholder="50" onChange={this.changeArraySize}/>
                  <div id="selectSize">
                     <select name="sortingType" onChange={this.changeSortingType}>
                        <option value="mergeSort">Tri par fusion</option>
                        <option value="quickSort">Tri rapide</option>
                        <option value="heapSort">Tri par saut</option>
                        <option value="bubbleSort">Tri par bulle</option>
                     </select>
                  </div>
               </div>
               {
               this.state.showStats && 
                  <p>Étapes : {this.state.steps} || temps : {this.state.steps * ANIMATION_SPEED} secondes</p>
               }
               <div id="headerRight">
                  <button id="newArr" onClick={this.makeNewArray}>Nouvel échantillon</button>
                  <button id="sortButton" onClick={this.startSort}>Trier</button>
               </div>
            </div>
            <div id="arrayView">
            {this.state.mainArray.map((value, index: number) => {
               return(
                  <div 
                     className="bar"
                     key={index}
                     style={{
                        height: `${value}vh`,
                        width: `${70/this.state.arraySize}vw`,
                        backgroundColor: "#98971a"
                     }}>

                  </div>
               )
            })}
            </div>
            {Footer("sorting")}
         </div>
      )
   }
}
