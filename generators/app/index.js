const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = class extends (
  Generator
) {
  prompting() {
    this.log(yosay(`Welcome to ${chalk.red('DbgGate plugin')} generator!`));

    const prompts = [
      {
        type: 'input',
        name: 'packageName',
        message: 'Your plugin name (recomended convention: prefixed by dbgate-plugin-)',
        default: 'dbgate-plugin-' + this.appname.toLowerCase(),
      },
      {
        type: 'list',
        name: 'pluginType',
        message: 'Choose plugin type',
        choices: [
          {
            name: 'File format plugin',
            value: 'fileFormat',
          },
          {
            name: 'Database driver plugin',
            value: 'databaseDriver',
          },
        ],
      },
      {
        type: 'list',
        name: 'packageManager',
        message: 'Choose package manager',
        choices: ['yarn', 'npm', 'I will run it manually'],
      },
    ];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  paths() {
    this.destinationRoot(`./${this.props.packageName}`);
  }

  writing() {
    const { packageName } = this.props;
    const shortName = packageName.startsWith('dbgate-plugin-')
      ? packageName.substring('dbgate-plugin-'.length)
      : packageName;
    const camelName = _.camelCase(shortName);
    const pascalName = _.upperFirst(camelName);

    const tplProps = {
      packageName,
      shortName,
      camelName,
      pascalName,
    };
    this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), tplProps);
    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), tplProps);
    this.fs.copy(this.templatePath('prettier.config.js'), this.destinationPath('prettier.config.js'), tplProps);
    this.fs.copy(this.templatePath('icon.svg'), this.destinationPath('icon.svg'), tplProps);

    this.fs.copyTpl(
      this.templatePath('webpack-frontend.config.js'),
      this.destinationPath('webpack-frontend.config.js'),
      tplProps
    );
    this.fs.copyTpl(
      this.templatePath('webpack-backend.config.js'),
      this.destinationPath('webpack-backend.config.js'),
      tplProps
    );

    if (this.props.pluginType == 'fileFormat') {
      this.fs.copyTpl(
        this.templatePath('src-fileFormat/frontend/index.js'),
        this.destinationPath('src/frontend/index.js'),
        tplProps
      );

      this.fs.copyTpl(
        this.templatePath('src-fileFormat/backend/index.js'),
        this.destinationPath('src/backend/index.js'),
        tplProps
      );
      this.fs.copyTpl(
        this.templatePath('src-fileFormat/backend/reader.js'),
        this.destinationPath(`src/backend/${camelName}Reader.js`),
        tplProps
      );
      this.fs.copyTpl(
        this.templatePath('src-fileFormat/backend/writer.js'),
        this.destinationPath(`src/backend/${camelName}Writer.js`),
        tplProps
      );
    }
  }

  install() {
    if (this.props.packageManager == 'yarn') {
      this.yarnInstall();
    }
    if (this.props.packageManager == 'npm') {
      this.npmInstall();
    }
  }
};
