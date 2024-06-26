import * as React from 'react';

export const About = () => {
   return (
      <div className="about">
      <h2 style={{color: 'black', fontWeight: '600'}}>KendoReact Admin Dashboard</h2>
      <br></br>
      <div className='body'>
      <p>
      KendoReact Admin Dashboard is a web application built with Progress award-winning
          <a href="https://www.telerik.com/kendo-react-ui"> KendoReact widgets</a> - 100+ UI components to help you
          build responsive websites and apps fast. KendoReact <sup>®</sup> offers widgets for every need - from
          the must-have for every app Grids, Dropdowns and Menus to the advanced line-of-business UI, such as Charts,
          Gantt, Diagram, Scheduler, PivotGrid and Maps.
      </p>
  
      <p>
          The sample app showcases some of the most popular KendoReact for  widgets, such as Grid, TileLayout, Form,
          Charts, Gauges, etc. in a real world scenario.
      </p>
      </div> 
  

        <br></br>
        <br></br>
      <div className="section-white">
          <h3 className="section-title">KendoReact widgets</h3>
          <ul className="col-xs-4">
              <li>
                  <a href="https://www.telerik.com/kendo-react-ui/components/grid/">Grid</a>
              </li>
              <li>
                  <a href="https://www.telerik.com/kendo-react-ui/components/charts/">Charts</a>
              </li>
              <li>
                  <a href="https://www.telerik.com/kendo-react-ui/components/layout/tilelayout/">TileLayout</a>
              </li>
              <li>
                  <a href="https://www.telerik.com/kendo-react-ui/components/layout/api/Drawer/">Drawer</a>
              </li>
              <li>
                  <a href="https://www.telerik.com/kendo-react-ui/components/form/api/Form/">Form</a>
              </li>
              <li>
                  <a href="https://www.telerik.com/kendo-react-ui/components/buttons/button/">Button</a>
              </li>
              <li>
                  <a href="https://www.telerik.com/kendo-react-ui/components/notification/">Notification</a>
                  <li>
                  <a href="https://www.telerik.com/kendo-react-ui/components/listview/">ListView</a>
              </li>
              <li>
                  <a href="https://www.telerik.com/kendo-react-ui/components/inputs/">Inputs</a>
              </li>
              </li>
              <li>
              <a href="https://www.telerik.com/kendo-react-ui/components/gauges/">Gauges</a>
              </li>
          </ul>
      </div>
      <a className="k-link  k-button k-button-md k-button-rectangle k-rounded-md k-button-solid k-button-solid-primary" href="https://github.com/telerik/admin-dashboard">
          <svg className="k-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" focusable="false">
              <title>GitHub</title>
              <path
                  d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z"
                  fill="currentColor" fillRule="evenodd"></path>
          </svg>
  
          Get the Source Code
      </a>
  </div>
   )
}