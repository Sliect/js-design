var arr = ['a', 'b', 'c', 'd', 'e']

for (var i = 0, item; item = arr[i++];) {
  console.log(item)
}

// item 只在for循环里起作用, 且判断条件为undeined 隐式转换为false