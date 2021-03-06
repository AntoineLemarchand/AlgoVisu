export function getMergeSortAnimations(array: any[]) {
  const animations = [] as any[];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSort(array, 0, array.length -1, auxiliaryArray, animations);
  return animations;
}

function mergeSort(
  mainArray: number[],
  startIndex: number,
  endIndex: number,
  auxiliaryArray: number[],
  animations: any,
) {
  if (startIndex === endIndex) return;
  const middleIndex = Math.floor((startIndex + endIndex) / 2);
  mergeSort(auxiliaryArray, startIndex, middleIndex, mainArray, animations);
  mergeSort(auxiliaryArray, middleIndex+1, endIndex, mainArray, animations);
  mergeSortHelper(mainArray, startIndex, middleIndex, endIndex, auxiliaryArray, animations)
}

function mergeSortHelper(
  mainArray: number[],
  startIndex: number,
  middleIndex: number,
  endIndex: number,
  auxiliaryArray: number[],
  animations: any,
) {
  let k = startIndex;
  let i = startIndex;
  let j = middleIndex + 1;
  while(i <= middleIndex && j <= endIndex) {
    animations.push([i,j]);
    animations.push([i,j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIndex) {
    animations.push([i,i]);
    animations.push([i,i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIndex) {
    animations.push([j,j]);
    animations.push([j,j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
