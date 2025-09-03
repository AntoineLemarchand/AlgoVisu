import React, {Component} from 'react';
import './SortingVisualizer.css';
import Footer from '../../Footer/Footer';
import {getMergeSortAnimations} from '../Algorithms/MergeSort';
import {getQuickSortAnimations} from '../Algorithms/Quicksort';
import {getHeapSortAnimations} from '../Algorithms/HeapSort';
import {getBubbleSortAnimations} from '../Algorithms/BubbleSort';

const ANIMATION_SPEED = 5;
const PRIMARY_COLOR = '#a6e3a1'
const SECONDARY_COLOR = '#f38ba38'

export default class SortingVisualizer extends Component {
   state = {
      mainArray: [] as number[],
      arraySize: 50,
      sortingType: "mergeSort",
      steps: 0,
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

   animStates = (states: {}) => {
      this.setState(states)
   }

   sortAnimation = (animations: any[], callback: Function) => {
      for (let i = 0; i < animations.length; i++) {
         const arrayBars = document.getElementsByClassName('bar');
         const isColorChange = i % 3 !== 2;
         if (isColorChange) {
            const [barOneIndex, barTwoIndex] = animations[i];
            const barOneStyle = arrayBars[barOneIndex] as HTMLElement;
            const barTwoStyle = arrayBars[barTwoIndex] as HTMLElement;
            const color = (i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR);
            setTimeout(() => {
               barOneStyle.style.backgroundColor = color;
               barTwoStyle.style.backgroundColor = color;
            }, i * ANIMATION_SPEED)
         } else {
            setTimeout(() => {
               const [barOneIndex, newHeight] = animations[i];
               const barOneStyle = arrayBars[barOneIndex] as HTMLElement;
               barOneStyle.style.height = `${newHeight}vh`;
               if (i===animations.length-1) {
                  callback();
               }
            }, i * ANIMATION_SPEED)
         }
      }
   }

   makeNewArray = () => {
      this.setState({mainArray: [] as number[], steps: 0})
      var array:number[] = [];
      for (let i = 0 ;i<this.state.arraySize; i++) {
         let randomInt:number = Math.floor(Math.random() * 75)+5;
         array.push(randomInt) ;
      }
      this.setState({mainArray: array});
      var bars = document.getElementsByClassName('bar');
      for (let j = 0; j<bars.length; j++) {
         let bar = bars[j] as HTMLElement;
         bar.style.remove = PRIMARY_COLOR;
      }
   }

   startSort = () => {
      const method = this.state.sortingType;
      switch(method) {
         case "mergeSort":
            const mergeAnim = getMergeSortAnimations(this.state.mainArray);
            this.sortAnimation(mergeAnim, ()=>{this.setState({steps: mergeAnim.length})});
            break;
         case "quickSort":
            const quickAnim = getQuickSortAnimations(this.state.mainArray);
            this.sortAnimation(quickAnim, ()=>{this.setState({steps: quickAnim.length})});
            break;
         case "heapSort":
            const heapAnim = getHeapSortAnimations(this.state.mainArray);
            this.sortAnimation(heapAnim, ()=>{this.setState({steps: heapAnim.length})});
            break;
         case "bubbleSort":
            const bubbleAnim = getBubbleSortAnimations(this.state.mainArray);
            this.sortAnimation(bubbleAnim, ()=>{this.setState({steps: bubbleAnim.length})});
            break;
      }
   }

   componentDidMount() {
      this.makeNewArray();
   }

   render() {
      return(
         <div className="h-screen flex flex-col">
            <div className="h-24 bg-background flex justify-between items-center">
              <div className='flex flex-col ps-8'>
                <select name="sortingType" className="bg-primary text-background px-2 h-12 rounded-md" onChange={this.changeSortingType}>
                   <option value="mergeSort">Merge sort</option>
                   <option value="quickSort">Quick sort</option>
                   <option value="heapSort">Heap sort</option>
                   <option value="bubbleSort">Bubble sort</option>
                </select>
                <p className="text-primary">
                     <p>Étapes : {this.state.steps/3}</p>
                </p>
              </div>
              <div className="flex flex-col p-2 text-center">
                 <label htmlFor="number" className='block mb-1 text-sm text-primary'>Number</label>
                 <input type="number" min={1} max={500} placeholder="50" className="bg-secondary w-16 text-center me-2 rounded-md text-primary" onChange={this.changeArraySize}/>
              </div>
              <div className='pe-8'>
                 <button className='rounded-l-lg bg-failure p-2' onClick={this.makeNewArray}>Reset</button>
                 <button className='rounded-r-lg bg-success p-2' onClick={this.startSort}>Sort</button>
              </div>
            </div>
            <div className="bg-background/60 flex items-end justify-center h-full">
            {this.state.mainArray.map((value, index: number) => {
               return(
                  <div 
                     className="bar outline-2 outline-background bg-secondary"
                     key={index}
                     style={{
                        height: `${value}vh`,
                        width: `${70/this.state.arraySize}vw`,
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
