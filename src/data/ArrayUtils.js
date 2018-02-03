export  default  class ArrayUtils{
    /** 更新数组，若item已存在则从数组中将它移除，否则添加进数组**/
    static updataArray(array,item){
        for (let i=0;i<array.length;i++){
            let temp = array[i];
            if (temp===item){
                array.splice(i,1);  //splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
                return;
            }
        }
        array.push(item);

    }
    //克隆一个数组
    static clone(from){
        if(!from)return [];
        let newArray = [];
        for(let i=0; i<from.length;i++){

            newArray[i]=from[i];
        }
        return newArray;
    }
// 判断两个数组的元素是否一一对应相等
    static isEqual(arr1,arr2){
        if(!(arr1&&arr2))return  false;//如果两个都为空返回
        if(arr1.length!==arr2.length)return false;
        for (let i=0;i<arr2.length;i++){
            if(arr1[i]!==arr2[i]) return false;

        }
        return true;


    }
    // 将数组中指定的元素移除
    static remove(arr,item){
        if(!arr)return;
        for(let i=0;i<arr.length;i++){
            if(item===arr[i])arr.splice(i,1);
        }
    }




}