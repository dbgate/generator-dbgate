const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = class extends Generator {
  prompting() {
    this.log(yosay(`Welcome to ${chalk.red('DbgGate plugin')} generator!`));

    const prompts = [
      {
        type: 'input',
        name: 'packageName',
        message: 'Your plugin name (must be prefixed with dbgate-plugin-)',
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
          {
            name: 'Theme plugin - light theme',
            value: 'themeLight',
          },
          {
            name: 'Theme plugin - dark theme',
            value: 'themeDark',
          },
        ],
      },
      {
        type: 'list',
        name: 'packageManager',
        message: 'Choose package manager',
        choices: ['yarn', 'npm'],
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
    const { packageName, packageManager } = this.props;

    if (!packageName.startsWith('dbgate-plugin-')) {
      console.log('Error: package name must start with prefix "dbgate-plugin-", terminating');
      process.exit(1);
    }

    const shortName = packageName.startsWith('dbgate-plugin-')
      ? packageName.substring('dbgate-plugin-'.length)
      : packageName;
    const camelName = _.camelCase(shortName);
    const pascalName = _.upperFirst(camelName);
    const runCommand = packageManager == 'npm' ? 'npm run' : 'yarn';

    const tplProps = {
      packageName,
      shortName,
      camelName,
      pascalName,
      runCommand,
      packageManager,
    };
    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), tplProps);
    this.fs.copy(this.templatePath('prettier.config.js'), this.destinationPath('prettier.config.js'), tplProps);
    this.fs.copy(this.templatePath('icon.svg'), this.destinationPath('icon.svg'));
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));

    if (this.props.pluginType == 'themeLight' || this.props.pluginType == 'themeDark') {
      this.fs.copyTpl(this.templatePath('package-frontend.json'), this.destinationPath('package.json'), tplProps);
      this.fs.copyTpl(
        this.templatePath('webpack-frontend-only.config.js'),
        this.destinationPath('webpack.config.js'),
        tplProps
      );

      if (this.props.pluginType == 'themeLight') {
        this.fs.copyTpl(this.templatePath('src-themeLight/index.js'), this.destinationPath('src/index.js'), tplProps);
      }
      if (this.props.pluginType == 'themeDark') {
        this.fs.copyTpl(this.templatePath('src-themeDark/index.js'), this.destinationPath('src/index.js'), tplProps);
      }
    } else {
      this.fs.copyTpl(this.templatePath('package-full.json'), this.destinationPath('package.json'), tplProps);

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
          this.destinationPath(`src/backend/reader.js`),
          tplProps
        );
        this.fs.copyTpl(
          this.templatePath('src-fileFormat/backend/writer.js'),
          this.destinationPath(`src/backend/writer.js`),
          tplProps
        );
      }

      if (this.props.pluginType == 'databaseDriver') {
        this.fs.copyTpl(
          this.templatePath('src-databaseDriver/frontend/index.js'),
          this.destinationPath('src/frontend/index.js'),
          tplProps
        );
        this.fs.copyTpl(
          this.templatePath('src-databaseDriver/frontend/Dumper.js'),
          this.destinationPath('src/frontend/Dumper.js'),
          tplProps
        );
        this.fs.copyTpl(
          this.templatePath('src-databaseDriver/frontend/driver.js'),
          this.destinationPath('src/frontend/driver.js'),
          tplProps
        );

        this.fs.copyTpl(
          this.templatePath('src-databaseDriver/backend/driver.js'),
          this.destinationPath('src/backend/driver.js'),
          tplProps
        );
        this.fs.copyTpl(
          this.templatePath('src-databaseDriver/backend/index.js'),
          this.destinationPath('src/backend/index.js'),
          tplProps
        );
        this.fs.copyTpl(
          this.templatePath('src-databaseDriver/backend/Analyser.js'),
          this.destinationPath('src/backend/Analyser.js'),
          tplProps
        );
      }
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
