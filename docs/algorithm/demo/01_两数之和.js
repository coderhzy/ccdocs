// 暴力枚举

const twoSum = function (nums, target) {
    for(let i = 0; i < nums.length; i++){
        for(let j = i + 1;j < nums.length; j++){
            if(target - nums[i] === nums[j]){
                return [i,j] // 返回下标
            }
        }
    }

    console.log("no two sum solution")
}

const nums = [1,2,5,3]
console.log(twoSum(nums, 8)) // 下标： 2 3

// 散列表

const twoSum2 = function (nums, target) {
    const map = new Map() // 存储循环值
    for(let i = 0; i < nums.length; i++){
        const complement = target - nums[i]

        if(map.has(complement)){
            return [map.get(complement), i]
        }
        map.set(nums[i], i)
    }

    console.log("no two sum solution")
}

const nums2 = [1,2,5,3]
console.log(twoSum2(nums, 8)) // 下标： 2 3
