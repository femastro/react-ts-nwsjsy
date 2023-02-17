import * as React from 'react';
import './Styles/style.css';
import 'bootswatch/dist/slate/bootstrap.min.css';

import Header from './Header';

export default function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row py-5 text-danger text-center">
          <div className="col-md-6 mx-auto">
            <h3>Hello StackBlitz!</h3>
            <p className="text-white">
              Start editing to see some magic happen :)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
