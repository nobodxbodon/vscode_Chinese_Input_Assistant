# Change Log

All notable changes to the "ztest" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

- 添加了对所有文本编辑的支持并匹配本行外任意位置的中文
- 添加了词条描述避免被超长的拼音盖住后面的汉字内容 比如 汪汪汪汪汪汪汪汪黑汪汪汪 妙妙妙喵喵喵喵
- 屏蔽掉了那些非常非常长的文本因为这很可能不是你想输入的内 而不巧这段拼音很长涵盖了几乎所有的英文字母 然后随便按几个键都会提示出上面的内容就让人很闹心
- 删除了英文代码的重复提示项