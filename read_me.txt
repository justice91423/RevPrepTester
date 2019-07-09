From this directory run "npm install" from the command line to install the dependencies.  

You may also want to install Mocha globally so you will only need to type "mocha" in the command line instead of "./node_modules/mocha/bin/mocha".  To do this run "npm install mocha -g".

To start full test run through with reporting...
mocha test --reporter mochawesome --reporter-options showSkipped=true
or use the start.bat file.

Specific test suites can be run by naming them after "test/"
Example: "mocha test/coupons.js ..."

Environmental variables can be added before the command
Example: "env dev=true debug=false mocha test ..."

options
dev=true (displays debug text. Tests do not retry on failure. Browser windows do not close after tests. Tests in Chrome only.)
debug=false (Prevents debug text when in dev mode)
browsers=[browser name] (Tests in the names browser only)
