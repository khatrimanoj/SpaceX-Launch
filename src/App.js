import React, { Component } from 'react'
import './assets/scss/app.scss'
// import SideBar from './filter'

export default class javascriptMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      items: [],
      visible: 4,
      error: false,
      developedBy: 'Manoj Khatri',
      allData: [],
      active: false,
    }
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.setState((prev) => {
      return { visible: prev.visible + 4 };
    });
  }

  componentDidMount() {
    fetch("https://api.spaceXdata.com/v3/launches?limit=100").then(res => res.json()
    ).then(res => {
      this.setState({
        items: res,
        allData: res
      });
    }).catch(error => {
      console.error(error);
      this.setState({
        error: true
      });
    });
  }

  onKeyUp = e => {
    // filter post list by title using onKeyUp function
    const items = this.state.allData.filter(item =>
      item.mission_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    this.setState({ items });
  };

  yearDataFilter = year => {
    const items = this.state.allData.filter(item =>
      item.launch_year === year
    );
    this.setState({ items });
  }
  launchFilter = launch => {
    const items = this.state.allData.filter(item =>
      item.launch_success === launch
    );
    this.setState({ items });
  }
  landFilter = landing => {
    const items = this.state.allData.filter(item =>
      item.launch_landing === landing
    );
    this.setState({ items });
  }

  render() {
    const { active } = this.state
    return (
      <div className="container">

        <nav className="site_name"><h2>SpaceX Launch Programes</h2></nav>
        <div className="content_wrapper">
          <aside>
            <h1>Filters</h1>
            <div className="launch__year">
              <h3>Launch Year</h3>
              <ul>
                <li className={this.state.active ? 'active': 'activeted'}><a href="#"  onClick={() => this.yearDataFilter('2006')}>2006</a></li>
                <li className={this.state.active ? 'active': null}><a href="#"  onClick={() => this.yearDataFilter('2007')}>2007</a></li>
                <li className={this.state.active ? 'active': null}><a href="#"  onClick={() => this.yearDataFilter('2008')}>2008</a></li>
                <li className={this.state.active ? 'active': null}><a href="#"  onClick={() => this.yearDataFilter('2009')}>2009</a></li>
                <li className={this.state.active ? 'active': null}><a href="#"  onClick={() => this.yearDataFilter('2010')}>2010</a></li>
                <li className={this.state.active ? 'active': null}><a href="#"  onClick={() => this.yearDataFilter('2011')}>2011</a></li>
                <li className={this.state.active ? 'active': null}><a href="#"  onClick={() => this.yearDataFilter('2012')}>2012</a></li>
                <li className={this.state.active ? 'active': null}><a href="#"  onClick={() => this.yearDataFilter('2013')}>2013</a></li>
                <li className={this.state.active ? 'active': null}><a href="#"  onClick={() => this.yearDataFilter('2014')}>2014</a></li>
                <li className={this.state.active ? 'active': null}><a href="#"  onClick={() => this.yearDataFilter('2015')}>2015</a></li>
                <li className={this.state.active ? 'active': null}><a href="#"  onClick={() => this.yearDataFilter('2016')}>2016</a></li>
                <li className={this.state.active ? 'active': null}><a href="#"  onClick={() => this.yearDataFilter('2017')}>2017</a></li>
                <li className={this.state.active ? 'active': null}><a href="#"  onClick={() => this.yearDataFilter('2018')}>2018</a></li>
                <li className={this.state.active ? 'active': null}><a href="#"  onClick={() => this.yearDataFilter('2019')}>2019</a></li>
                <li className={this.state.active ? 'active': null}><a href="#"  onClick={() => this.yearDataFilter('2020')}>2020</a></li>
              </ul>
            </div>
            <div className="launch__success">
              <h3>Successfull Launch</h3>
              <ul>
                <li className={this.state.active ? 'active': null}><a href="#" onClick={() => this.launchFilter(true)}>True</a></li>
                <li className={this.state.active ? 'active': null}><a href="#"  onClick={() => this.launchFilter(false)}>False</a></li>
              </ul>
            </div>
            <div className="landing__success">
              <h3>Successfull Landing</h3>
              <ul>
                <li className={this.state.active ? 'active': null}><a href="#" onClick={() => this.landFilter(true)}>True</a></li>
                <li className={this.state.active ? 'active': null}><a href="#" onClick={() => this.landFilter(false)}>False</a></li>
              </ul>
            </div>
          </aside>
          <div className="main_body">
          <ul className="tiles" aria-live="polite">
          {this.state.items.length > 0 ? (
            this.state.items.slice(0, this.state.visible).map((item, index) => {
              console.log(item);
              var launch_success = '';
              if (item.launch_success) {
                launch_success = 'True';
              }
              else {
                launch_success = 'False';
              }
              return (
                <li key={item.id}>
                  <img src={item.links.mission_patch}></img>
                  <h3>{item.mission_name} <span>#{item.flight_number}</span></h3>
                  <div className="mission"><strong>Mission Ids:</strong>
                    <ul>
                      {item.mission_id.map((mid) => {
                        if (item.mission_id.length > 0) {
                          return (
                            <li>{mid}</li>
                          );
                        }
                        else {
                          return (
                            <li>-</li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                  <p><strong>Launch Year:</strong> {item.launch_year}</p>
                  <p><strong>Successfull Launch:</strong>{item.launch_success ? "True" : "False"}</p>
                  <p><strong>Successfull Landing:</strong> {item.land_success ? "True" : "False"}</p>
                </li>
              );
            })
          ) : (
            <div className="error-message">
              No Data is available
            </div>
          )}
            
              {/* {this.state.items.slice(0, this.state.visible).map((item, index) => {
                console.log(item);
                var launch_success = '';
                if (item.launch_success) {
                  launch_success = 'True';
                }
                else {
                  launch_success = 'False';
                }
                return (
                  <li key={item.id}>
                    <img src={item.links.mission_patch}></img>
                    <h3>{item.mission_name} <span>#{item.flight_number}</span></h3>
                    <div className="mission"><strong>Mission Ids:</strong>
                      <ul>
                        {item.mission_id.map((mid) => {
                          if (item.mission_id.length > 0) {
                            return (
                              <li>{mid}</li>
                            );
                          }
                          else {
                            return (
                              <li>-</li>
                            );
                          }
                        })}
                      </ul>
                    </div>
                    <p><strong>Launch Year:</strong> {item.launch_year}</p>
                    <p><strong>Successfull Launch:</strong>{item.launch_success ? "True" : "False"}</p>
                    <p><strong>Successfull Landing:</strong> {item.land_success ? "True" : "False"}</p>
                  </li>
                );
              })} */}
            </ul>
            {this.state.visible < this.state.items.length &&
              <button onClick={this.loadMore} type="button" className="load-more">Load more</button>
            }
          </div>
        </div>

        <footer>
          <p>Developed By {this.state.developedBy}</p>
        </footer>
      </div>
    )
  }
}