const fileFormat = {
    packageName: '<%= packageName %>',
    // file format identifier
    storageType: 'txt@<%= packageName %>',
    // file extension without leading dot
    extension: 'txt',
    // human readable file format name
    name: 'My new file format',
    // function name from backend, which contains reader factory, postfixed by package name
    readerFunc: 'reader@<%= packageName %>',
    // function name from backend, which contains writer factory, postfixed by package name
    writerFunc: 'writer@<%= packageName %>',
    // optional list of format arguments, which can be edited from UI
    args: [
      {
        type: 'select',
        name: 'delimiter',
        label: 'Delimiter',
        options: [
          { name: 'Comma (,)', value: ',' },
          { name: 'Semicolon (;)', value: ';' },
          { name: 'Tab', value: '\t' },
          { name: 'Pipe (|)', value: '|' },
        ],
        apiName: 'delimiter',
      },
      {
        type: 'checkbox',
        name: 'header',
        label: 'Has header row',
        apiName: 'header',
        default: true,
      },
    ],
  };
  
  export default {
    fileFormats: [fileFormat],
  };
  