import React from 'react';

const Dashboard = () => (
  <div className="container">
    <div className="jumbotron">
      <form className="form-group" encType="multipart/form-data" action="/upload" method="post">
        <label htmlFor="InputFile">File input</label>
        <input id="InputFile" type="file" accept="text/xml" name="uploader" />
        <input className="submit btn btn-default" type="submit" value="Upload" />
      </form>
    </div>
  </div>
);

export default Dashboard;
