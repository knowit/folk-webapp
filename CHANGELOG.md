# Changelog

All notable changes to this project will be documented in this file.

## [4.0.0] - 2021-11-04

### Added

- Added privacy policy to footer

### Changed:

- folk.knowit.no now uses the new production environment as the backend
- dev.folk.knowit.no now uses an actual development environment with artificial data
- The code that is responsible for handling data from kompetansekartlegging has been altered since the ingested format has changed drastically

## [3.2.0] - 2021-06-17

### Added

- Showing number of rows currently displayed, respecting filtering and search.

### Changed

- All dependencies in both front- and backend is updated to the latest version

## [3.1.0] - 2021-03-23

### Added

- User can change the threshold for competence and motivation score when filtering the employee list
- Search in employee list includes the current customer and work order, in addition to employee name
- Icon for sunburst chart

### Changed

- All dependencies in both front- and backend is updated to the latest version

### Fixed

- Opening an enlarged view of a chart no longer causes the original chart to resize in the background
- Yarn is now the only valid package manager for handling dependencies (use of npm is prevented)

### Removed

- Dependencies that are no longer used

## [3.0.0] - 2021-02-26

### Added

- The possibility to switch between chart types on the visulizations
- "Erfaring" is shown as bar chart as well as pie chart
- "Kompetanseområder" shows average score for competence and motivation for all employees on every main- and subcategory. Both as bar chart and radar chart
- "Kompetansemengde" shows percentage of employees that has scored 3 on motivation and competence for each category as barchart. Tooltip shows number of eemployees as well
- Sunburst graph is also shown as barchart
- Expanded view in table shows project- and work experience
- Expanded view in table shows competence and motivation score for all categories as bar chart and radar chart
- Customer data in table and on the page for each employee

### Changed

- bumped node version to 14.x
- Equal tables on both "Ansatte" and "Kompetanse"

## [2.1.0] - 2021-02-10

### Added

- Employee manager in employee list and employee site
- Backend error handling for faster identification and rectification of issues
- Competence areas graph and refactored reStructCategories to fit both employeeradar and competenceareas

### Changed

- Refactored backend
- Data aggregation now only deals with data (no more requests from data.js)
- Dataplattform lib now handles all reports needed for the request in one blow
- Better token management within nested calls
- New API handler with error handling nested in all directions
- All endpoints have been refactored to export reports outside of the aggregation function
- Reports exports support pre-processing (resolve parameters)
- Got rid of the UnhandledPromiseRejectionWarning that plagued every async function
- Made ready for (easier) further error handling implementation
- competence report in employeeCompetence and empData endpoints.

### Removed

- DataplattformClient implementation from backend

## [2.0.0] - 2021-01-26

### Added

- Radar chart for displaying average competence and motivation
- Line chart for displaying events in the "Fag og hendelser" visualizations
- Pictures of the employees in both tables
- Separate page for each employee

### Changed

- Changed from using sum of subcategories to average score for each category in Sunburst graph for displaying score for competence and motivation

### Removed

- Placeholders for charts at "Ansatte"-page

## [1.1.0] - 2021-01-06

### Added

- Filtering on competence from the competence mapping
- Filtering on motivation from the competence mapping

## [1.0.1] - 2020-12-11

### Added

- This changelog file.
- Script for running the backend locally.
- Documentation for backend.
- Made groups for experience in the "Erfaring" visualization.
- Footer
- Mailto link for reporting data errors
- Mailto link for contact and general feedback
- New chart colors

### Changed

- Changed from bar chart to sunburst chart for the "Kompetansekartlegging" visualization.
- Changed from bar chart to line chart for the "Aktivitet faggrupper" visualization.
- Changed from bar chart to pie chart for the "Erfaring" visualization.
- Changed from "Alders distribusjon" to "Detaljert oversikt" in dropdown on age chart.
- Changed width of columns in both tables.
- Uses virtualized table for both tables.
- Changed graph library to nivo
- Some design updates
- Changed labels on charts

### Removed

- Removed optional chaining for backend part

### Fixed

- Fixed height of charts when in expanded view.
- Fixed typo in age-chart
