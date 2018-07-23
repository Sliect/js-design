// 对象的部分结构和整体结构一致
// 同意对待所有对象
// 满足以上两种条件可以使用组合模式
var Folder = function (name) {
  this.name = name
  this.parent = null
  this.files = []
}

Folder.prototype.add = function (file) {
  file.parent = this
  this.files.push(file)
}

Folder.prototype.scan = function () {
  console.log('开始扫描文件夹:' + this.name)
  for (var i = 0, files = this.files, file; file = files[i++];) {
    file.scan()
  }
}

Folder.prototype.remove = function () {
  // 根节点或游离节点不允许删除
  if (!this.parent) {
    return false
  }
  for (var files = this.parent.files, i = files.length - 1; i >= 0; i--) {
    var file = files[i]
    if (file === this) {
      files.splice(i, 1)
    }
  }
}

var File = function (name) {
  this.name = name
}

File.prototype.add = function () {
  throw new Error('文件下不能再添加文件')
}

File.prototype.scan = function () {
  console.log('开始扫描文件:' + this.name)
}

var folder = new Folder('学习资料')
var folder1 = new Folder('js')
var folder2 = new Folder('vue')

var file = new File('vue实战')
var file1 = new File('犀牛书')
var file2 = new File('深入浅出nodejs')
var file3 = new File('集异璧之大成者')

folder.add(folder1)
folder.add(folder2)
folder1.add(file1)
folder1.add(file2)
folder1.add(file3)
folder2.add(file)

folder2.remove()

folder.scan()