import React, { Component, PropTypes } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    // this.state = state;
  }

  render() {
    return (
      <div className="container">
          <div className="jumbotron">
              <h1></h1>
              <form className="form-group"
              enctype="multipart/form-data"
              action="/upload"
              method="post">
                <label for="InputFile">File input</label>
                <input id="InputFile" type="file" accept="text/xml" name="uploader" />
                <input className="submit btn btn-default" type="submit" value="Upload" />
              </form>
          </div>
      </div>
    );
  }
}

// App.propTypes = {
//   children: PropTypes.object.isRequired,
//   dispatch: PropTypes.func.isRequired,
// };

export default App;
