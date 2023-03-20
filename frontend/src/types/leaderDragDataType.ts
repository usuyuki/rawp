export type LeaderDragDataType = {
[key: string]: Array<string>
  //↓本当はこうだが、配列アクセスで取り出す時にTSがそれはだめだよと言われるので上のようにしている
  // general:string[];
  // leader:string[];
}
