## Website Performance Optimization portfolio project
This project is part 4 of the Front End Nanodegree by Udacity.
It is used to teach about build files as well as JavaScript and CSS optimization
### How to build
```bash
sudo apt-get install imagemagick graphicsmagick
git clone git@github.com:Pepperrs/website-optimization-fend.git
cd website-optimization-fend
npm install
gulp build
```
### How to view
You can just open index.html with a browser of your choice.

### Optimizations performed
1. created a gulpfile, which:
    * uglifies the JavaScript files used
    * reduces the css files to only the operations that required
    * inlines css that is required on page load
    * compresses the remaining css
    * compresses all images
2. identified and removed a layout recalculating function in pizza.html scrolling
3. identified and removed a layout recalculating function in pizza.html resizing
4. optimized pageloading
