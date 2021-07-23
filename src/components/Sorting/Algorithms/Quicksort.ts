export function getQuickSortAnimations(array: any[]) {
  const animations = [] as any[];
  quickSort(array, 0, array.length - 1, animations);
  return animations;
}

function quickSort(
  mainArray: number[],
  startIndex: number,
  endIndex: number,
  animations: any[]
) {
  if (startIndex < endIndex) {
    var pivot = partition(mainArray, startIndex, endIndex, animations);
    quickSort(mainArray, startIndex, pivot - 1, animations);
    quickSort(mainArray, pivot + 1, endIndex, animations);
  }
}

function partition(
  mainArray: number[],
  startIndex: number,
  endIndex: number,
  animations: any[],
) {
  var pivot = mainArray[endIndex];
  var pIndex = startIndex;
  for (let i=startIndex; i < endIndex; i++) {
    if (mainArray[i] <= pivot) {

      animations.push([i,pIndex]);
      animations.push([i,pIndex]);
      animations.push([i,mainArray[pIndex]]);

      animations.push([pIndex,pIndex]);
      animations.push([pIndex,pIndex]);
      animations.push([pIndex,mainArray[i]]);

      let tmp = mainArray[i];
      mainArray[i] = mainArray[pIndex];
      mainArray[pIndex] = tmp;
      pIndex++;
    }
  }
  animations.push([pIndex,endIndex]);
  animations.push([pIndex,endIndex]);
  animations.push([pIndex,mainArray[endIndex]]);

  animations.push([endIndex,endIndex]);
  animations.push([endIndex,endIndex]);
  animations.push([endIndex,mainArray[pIndex]]);

  let tmp = mainArray[pIndex];
  mainArray[pIndex] = mainArray[endIndex];
  mainArray[endIndex] = tmp;
  return pIndex;
}
