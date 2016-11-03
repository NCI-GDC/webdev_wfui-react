import html from 'html';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import MTRC from 'markdown-to-react-components';
import PropTable from './PropTable';
import Node from './Node';
import { baseFonts } from './theme';
import { Pre } from './markdown';
import Playground from 'component-playground';
import jsxToString from 'jsx-to-string';
import Preview from './Preview';
import { transform } from 'babel-standalone';
import CodeMirror from 'react-codemirror';
import { Panel, Tabs, Tab, Nav, NavItem, Row, Col, Button } from 'react-bootstrap';

const stylesheet = {
  link: {
    base: {
      fontFamily: 'sans-serif',
      fontSize: 12,
      display: 'block',
      position: 'fixed',
      textDecoration: 'none',
      background: '#28c',
      color: '#fff',
      padding: '5px 15px',
      cursor: 'pointer',
    },
    topRight: {
      top: 0,
      right: 0,
      borderRadius: '0 0 0 5px',
    },
  },
  info: {
    position: 'absolute',
    background: 'white',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: '0 40px',
    overflow: 'auto',
  },
  children: {
    position: 'relative',
    zIndex: 0,
  },
  infoBody: {
    ...baseFonts,
    fontWeight: 300,
    lineHeight: 1.45,
    fontSize: 15,
  },
  infoContent: {
    marginBottom: 0,
  },
  header: {
    h1: {
      margin: '20px 0 0 0',
      padding: 0,
      fontSize: 35,
    },
    h2: {
      margin: '0 0 10px 0',
      padding: 0,
      fontWeight: 400,
      fontSize: 22,
    },
    body: {
      borderBottom: '1px solid #eee',
      marginBottom: 10,
    },
  },
  source: {
    h1: {
      margin: '20px 0 0 0',
      padding: '0 0 5px 0',
      fontSize: 25,
      borderBottom: '1px solid #EEE',
    },
  },
  propTableHead: {
    margin: '20px 0 0 0',
  },
};

export default class Story extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { open: false, code: "" };

    MTRC.configure(this.props.mtrcConf);
  }

  componentDidMount() {
    this.setState({ code: this.props.storyCode });
  }

  _renderStory() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }

  _renderInline() {
    return (
      <div>
        <div style={stylesheet.infoPage}>
          <div style={stylesheet.infoBody} >
            { this._getInfoHeader() }
          </div>
        </div>
        <div>
            { this._renderStory() }
        </div>
        <div style={stylesheet.infoPage}>
          <div style={stylesheet.infoBody} >
            { this._getInfoContent() }
            { this._getPropTables() }
            { this._getSourceCode() }
            { /*this._getStatic()*/ }
          </div>
        </div>
      </div>
    );
  }

  _compileCode(scope, code) {
    if(!code) return;
    try {
      var compiledCode = transform(`
        ((${Object.keys(scope).join(",")}) => (${code}));
      `, { presets: ["es2015", "react", "stage-1"] }).code;
      const tempScope = [];
      Object.keys(scope).forEach(s => tempScope.push(scope[s]));
      let comp = eval(compiledCode).apply(null, tempScope);
      return comp;
    } catch (err) {
      return err.toString();
    }
  }

  _renderOverlay() {
    const { showEditor, storyCode, editorScope } = this.props;
    const { code } = this.state;
    const linkStyle = {
      ...stylesheet.link.base,
      ...stylesheet.link.topRight,
    };

    const infoStyle = Object.assign({}, stylesheet.info);
    if (!this.state.open) {
      infoStyle.display = 'none';
    }

    const openOverlay = () => {
      this.setState({ open: true });
      return false;
    };

    const closeOverlay = () => {
      this.setState({ open: false });
      return false;
    };

    return (
      <div>
        <div style={stylesheet.children}>
          { this._getInfoHeader() }
          {this._compileCode(editorScope, code)}
          <CodeMirror value={this.state.code} onChange={(code)=>{this.setState({code:code})}} options={{lineNumbers: true}} />
        </div>
        <a style={linkStyle} onClick={openOverlay}>?</a>
        <div style={infoStyle}>
          <a style={linkStyle} onClick={closeOverlay}>×</a>
          <div style={stylesheet.infoPage}>
            <div style={stylesheet.infoBody}>
              { this._getInfoContent() }
              { this._getPropTables() }
              { this._getSourceCode() }
              { this._getStatic() }
            </div>
          </div>
        </div>
      </div>
    );
  }

  _getInfoHeader() {
    if (!this.props.context || !this.props.showHeader) {
      return null;
    }

    return (
      <div>
        <h2>{this.props.context.kind}</h2>
        <h2 style={stylesheet.header.h2}>{this.props.context.story}</h2>
      </div>
    );
  }

  _getInfoContent() {
    if (!this.props.info) {
      return '';
    }
    const lines = this.props.info.split('\n');
    while (lines[0].trim() === '') {
      lines.shift();
    }
    let padding = 0;
    const matches = lines[0].match(/^ */);
    if (matches) {
      padding = matches[0].length;
    }
    const source = lines.map(s => s.slice(padding)).join('\n');
    return (
      <div style={stylesheet.infoContent}>
        {MTRC(source).tree}
      </div>
    );
  }

  _getSourceCode() {
    if (!this.props.showSource) {
      return null;
    }

    return (
      <div>
        <h1 style={stylesheet.source.h1}>Story Source</h1>
        <Pre>
        {React.Children.map(this.props.children, (root, idx) => {
          return <Node key={idx} depth={0} node={root} />
        })}
        </Pre>
        
      </div>
    );
  }

  _getStatic() {
    
    if (!this.props.showStatic) {
      return null;
    }

    return (
      <div>
        <h1 style={stylesheet.source.h1}>Story Static</h1>
        <Preview
              code={this.props.storyCode}
              scope={this.props.editorScope} />
        <Pre>
        {/* html.prettyPrint(ReactDOMServer.renderToStaticMarkup(this.props.children)) */}
        </Pre>
      </div>
    );
  }

  _getPropTables(component) {
    const { editorScope } = this.props;
    const types = new Map();
    const children = component;

    if (this.props.editorScope === null) {
      return null;
    }

    let components = (
      <div>
        {Object.keys(editorScope).map((key,i)=>{
          if(key=='React') return;
          let Comp = editorScope[key];
          return <Comp key={i}/>;
        })}
      </div>
    );

    if (components.props.children.propTables) {
      components.props.children.propTables.forEach(function (type) {
        types.set(type, true);
      });
    }

    // depth-first traverse and collect types
    function extract(children) {
      if (!children) {
        return;
      }
      if (Array.isArray(children)) {
        children.forEach(extract);
        return;
      }
      if (children.props && children.props.children) {
        extract(children.props.children);
      }
      if (typeof children === 'string' || typeof children.type === 'string') {
        return;
      }
      if (children.type && !types.has(children.type)) {
        types.set(children.type, true);
      }
    }

    // extract components from children
    extract(components.props.children);

    const array = Array.from(types.keys());
    array.sort(function (a, b) {
      return (a.displayName || a.name) > (b.displayName || b.name);
    });

    const propTables = array.map(function (type, idx) {
      return (
        <div key={idx}>
          <h2 style={stylesheet.propTableHead}>"{type.displayName || type.name}" Component</h2>
          <PropTable type={type} />
        </div>
      );
    });

    if (!propTables || propTables.length === 0) {
      return null;
    }

    return (
      <div>
        <h1 style={stylesheet.source.h1}>Prop Types</h1>
        {propTables}
      </div>
    );

    return;
  }

  render() {
    
    const { showEditor, storyCode, editorScope } = this.props;
    const { code } = this.state;

    if (this.props.showInline) {
      return this._renderInline();
    }

    // return this._renderOverlay();

    return (
      
      <div>
        { this._getInfoHeader() }
        <Panel>
          {this._compileCode(editorScope, code)}  
        </Panel>
        <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
          <Tab eventKey={1} title="Tab 1">
            {this._compileCode(editorScope, code)}
            <CodeMirror value={this.state.code} onChange={(code)=>{this.setState({code:code})}} options={{lineNumbers: true}} />
          </Tab>
          <Tab eventKey={2} title="Tab 2">
            { this._getInfoContent() }
            { this._getPropTables() }
            { this._getSourceCode() }
            { this._getStatic() }
          </Tab>
        </Tabs>
      </div>
    )
  }
}

Story.displayName = 'Story';
Story.propTypes = {
  context: React.PropTypes.object,
  info: React.PropTypes.string,
  propTables: React.PropTypes.arrayOf(React.PropTypes.func),
  showInline: React.PropTypes.bool,
  showHeader: React.PropTypes.bool,
  showSource: React.PropTypes.bool,
  showStatic: React.PropTypes.bool,
  children: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]),
  mtrcConf: React.PropTypes.object
};

Story.defaultProps = {
  showInline: false,
  showHeader: true,
  showSource: true,
  showStatic: true,
  mtrcConf: {}
};
