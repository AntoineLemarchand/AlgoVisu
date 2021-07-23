export function getHeapSortAnimations(array: number[]) {
  const animations = [] as any[];
  heapSort(array, array.length, animations);
  return animations;
}

function heapSort(
  array: number[],
  n: number,
  animations: any[]
) {
  for (let i = n/2-1; i >= 0; i--) {
    maxHeapify(array, n, i, animations);
  }

  for (let i = n-1; i >= 0; i--) {
    
    animations.push([0,i]);
    animations.push([0,i]);
    animations.push([0,array[i]]);

    animations.push([i,i]);
    animations.push([i,i]);
    animations.push([i,array[0]]);

    let tmp = array[0];
    array[0] = array[i];
    array[i] = tmp;
    maxHeapify(array, i, 0, animations);
  }
}

function maxHeapify(
  array: number[],
  n: number,
  i: number,
  animations: any[]
) {
  let largest = i;
  let left = 2*i+1;
  let right = 2*i+2;

  if (left < n && array[left] > array[largest]) {
    largest = left;
  }

  if (right < n && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== i) {

    animations.push([i,largest]);
    animations.push([i,largest]);
    animations.push([i,array[largest]]);

    animations.push([largest,largest]);
    animations.push([largest,largest]);
    animations.push([largest,array[i]]);

    let tmp = array[i];
    array[i] = array[largest];
    array[largest] = tmp;
    maxHeapify(array, n, largest, animations)
  }
}
