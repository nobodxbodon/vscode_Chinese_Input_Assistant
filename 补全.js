const vscode = require('vscode');
// const util = require('./util');
const py = require('./转拼音')
// const fs = require('fs');
// const path = require('path');
/**
 * 自动提示实现，这里模拟一个很简单的操作
 * 当输入 this.dependencies.xxx时自动把package.json中的依赖带出来
 * 当然这个例子没啥实际意义，仅仅是为了演示如何实现功能
 * @param {*} document 
 * @param {*} position 
 * @param {*} token 
 * @param {*} context 
 */

var 提示文本 = ["中文测试","文本","数据","中英结合abdc"];
const wordPattern = /(-?\d*\.\d\w*)|([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)/g;

function provideCompletionItems(document, position, token, context) {

    // const document = vscode.window.activeTextEditor.document;
    // const position = vscode.window.activeTextEditor.selection.active;
    // console.log(document)
    var 总行数 =  document.lineCount
    var 当前行 =  position.line;
    // var cursorlocation = position.character;
    var 代码内容 = "";
    for (var i = 0; i < 总行数; i++){
        if(i!=当前行)
        代码内容 += document.lineAt(i).text+"\n";
    }
    // code += document.lineAt(cursorline).text.substring(0,cursorlocation+1);
    提示文本=  去重(代码内容.match(wordPattern)) ;





    // const line = document.lineAt(position);

    // //const projectPath = util.getProjectPath(document)

    // // 只截取到光标位置为止，防止一些特殊情况
    // const lineText = line.text.substring(0, position.character);
    // const fileName = document.fileName;
    // const workDir  = path.dirname(fileName);
    // const word   = document.getText(document.getWordRangeAtPosition(position));
    // const linez  = document.lineAt(position);
    // //console.log(fileName,workDir,word,linez)
    // // console.log(vscode,path,fs)
    // if(true) {
        //const json = require(`${projectPath}/package.json`);
        //const dependencies = Object.keys(json.dependencies || {}).concat(Object.keys(json.devDependencies || {}));
        // return  new vscode.CompletionItem("aa中文", vscode.CompletionItemKind.Text);
        return 提示文本.map(文本 => {
            // vscode.CompletionItemKind 表示提示的类型
            // console.log(dep)
            // if(py.包含中文(文本)){//&&文本.length<20
                // console.log(文本)
                var item=new vscode.CompletionItem(
                    py.trans(文本),
                    vscode.CompletionItemKind.Text)
                // item.textEdit=new vscode.TextEdit(vscode.Range(1,1,10,10),py.trans(dep))
                item.detail=文本
                item.insertText=文本
                return item;
            // }
            // return new vscode.CompletionItem(文本,vscode.CompletionItemKind.Text)

        })
        
    // }
}

/**
 * 光标选中当前自动补全item时触发动作，一般情况下无需处理
 * @param {*} item 
 * @param {*} token 
 */
function resolveCompletionItem(item, token) {
    return null;
}

function 去重 (arr) {
    var ret=Array.from(new Set(arr))
    // ret.remove("function")
    // ret.remove("ver")
    // ret.remove("let")
    // ret.remove("module")
    // ret.remove("exports")
    // console.log(ret)
    for (var i = 0; i < ret.length; i++) {
        　　if ((!py.包含中文(ret[i]))||ret[i].length>20) {
            ret.splice(i, 1); // 将使后面的元素依次前移，数组长度减1
        　　　　i--; // 如果不减，将漏掉一个元素
        　　}
        }
        // console.log(ret)
    return ret;
  }

module.exports = function(context) {
    // 注册代码建议提示，只有当按下“.”时才触发
    // console.log(context);
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: '*' }, {
        provideCompletionItems,
        resolveCompletionItem
    }));
    // console.log("completion method registes done");
    // vscode.window.onDidChangeActiveTextEditor(addItem);
    // vscode.workspace.onDidChangeTextDocument(textChange);
};

