export function getBubbleSortAnimations(array: number[]) {
  const animations = [] as any[];
  bubbleSort(array, animations);
  return animations;
}

function bubbleSort(
  array: number[],
  animations: any[]
) {
  let n = array.length;
  let swapped = false;

  for (let i = 0; i < n-1; i++) {
    for ( let j = 0; j <= n-i-1; j++ ) {
      if (array[j] > array[j+1]){

        animations.push([j+1,j]);
        animations.push([j+1,j]);
        animations.push([j+1,array[j]]);

        animations.push([j,j]);
        animations.push([j,j]);
        animations.push([j,array[j+1]]);

        [array[j], array[j+1]] = [array[j+1], array[j]];
        swapped = true;
      }
    }

    if(!swapped) {
      break;
    }
  }
}
