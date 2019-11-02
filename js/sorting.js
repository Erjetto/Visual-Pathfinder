<!DOCTYPE html>
<html lang="bn">
<head>
<meta charset="UTF-8">
<meta name="description" content="Sorting is a very classic problem of reordering items (that can be compared, e.g. integers, floating-point numbers, strings, etc) of an array (or a list) in a certain order (increasing, non-decreasing, decreasing, non-increasing, lexicographical, etc).There are many different sorting algorithms, each has its own advantages and limitations.Sorting is commonly used as the introductory problem in various Computer Science classes to showcase a range of algorithmic ideas.Without loss of generality, we assume that we will sort only Integers, not necessarily distinct, in non-decreasing order in this visualization. Try clicking Bubble Sort for a sample animation of sorting the list of 5 jumbled integers (with duplicate) above.Click &#39;Next&#39; (on the top right)/press &#39;Page Down&#39; to advance this e-Lecture slide, use the drop down list/press &#39;Space&#39; to jump to a specific slide, or Click &#39;X&#39; (on the bottom right)/press &#39;Esc&#39; to go to Exploration mode.">
<meta name="keywords" content="Sorting Bubble Select Selection Insert Insertion Merge Random Quick Counting Radix">
 
<meta name="csrf-token" content="Bd99Jj3qtUmEE7CcC6e4996kJrndYP131G3dkJrR">
<meta http-equiv="X-UA-Compatible" content="IE=EDGE">
<meta property="og:image" content="https://visualgo.net/img/png/sorting.png">
<title>VisuAlgo - Sorting (Bubble, Selection, Insertion, Merge, Quick, Counting, Radix)</title>
<link rel="icon" href="https://visualgo.net/img/favicon.png" type="image/x-icon">
<link rel="shortcut icon" href="https://visualgo.net/img/favicon.png" type="image/x-icon">
<link rel="apple-touch-icon" href="https://visualgo.net/img/favicon.png">
<link rel="apple-touch-icon" sizes="72x72" href="https://visualgo.net/img/favicon.png">
<link rel="apple-touch-icon" sizes="114x114" href="https://visualgo.net/img/favicon.png">
<link rel="stylesheet" type="text/css" href="https://visualgo.net/fonts/silkscreen/stylesheet.css">
<link rel="stylesheet" type="text/css" href="https://visualgo.net/css/common.css">
<link rel="stylesheet" href="https://visualgo.net/css/viz-1.0.1.css">
<link rel="stylesheet" href="https://visualgo.net/css/visual.css">
<link rel="stylesheet" href="https://visualgo.net/css/drawgraph.css">
<style>
      #e-lecture {
        top: 45px;
        right: 130px;
        width: 400px;
        display: block;
        background: none;
        /*overflow: normal;*/
        white-space: normal;
        text-align: right;
        color: black; font-weight: bold; font-size: 20px;
      }
      .electure-prev, .electure-next { /* force update, copied from viz.css */
        position: absolute;
        /* bottom: -12px; */
        top: -20px;
        /*bottom: '';*/
        padding: 3px 8px;
        background: #999;
        color: white;
        cursor: pointer;
        border-radius: 2px;
      }
      .electure-prev {
        left: -10px;
        /* right: 30px; */
      }
      .electure-next {
        right: -10px;
        color: white;
      }
    </style>
<style>
.execAction { padding: 5px 8px; }
.err { padding: 5px 0px; }
#actions-extras input {
  width: 35px;
  padding: 5px 8px 7px;
}

.create { bottom: 92px; }
.sort { bottom: 65px; }

#create-sorted-increasing { float: left; padding: none; }
#create-sorted-decreasing { float: left; padding: none; }
#create-nearly-sorted-increasing { float: left; padding: none; }
#create-nearly-sorted-decreasing { float: left; padding: none; }
#create-userdefined-input input { width: 300px; }

text {
  fill: black;
  font: 20px sans-serif;
  text-anchor: middle; 
}

#viz-radix-sort-canvas {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -500px;
  height: 500px;
  width: 1000px;
}

div .radix-sort-element {
  position: absolute;
  border: 1px solid black;
  width: 55px;
  font: 20px sans-serif;
  color: black;
}

#radix-sort-bucket-labels-collection {
  position: absolute;
  bottom: 0px;
  left: 0px;
}

.radix-sort-bucket-label {
  position: absolute;
  border-top: 1px solid black;
  width: 57px;
  font: 20px sans-serif;
  color: black;
}

#sort-viz {
  width: 100%;
  text-align: center;
  overflow: hidden;
  padding-top: 10px;
}
</style>
<script>
      function changeURL() {
        var URL = window.location.href.split('/');
        var val = document.getElementById("Language").value;
        URL[3] = val;
        window.location.assign(URL.join('/'));
      }
    </script>
</head>
<body>
<div id="top-bar">
<a href="http://www.comp.nus.edu.sg/~stevenha"><span class="colour" style="border: 1px solid green; border-radius: 25px;">7</span></a>&nbsp;&nbsp;&nbsp;
<a id="home" href="/">Visu<span class="colour">Algo</span><span style="font-size: 40%">.net</span></a>
/
<select id="Language" onchange="changeURL()">
<option value="en">en</option>
<option value="zh">zh</option>
<option value="es">es</option>
<option value="pt">pt</option>
<option value="ru">ru</option>
<option value="id">id</option>
<option value="de">de</option>
<option value="bn" selected>bn</option>
<option value="ja">ja</option>
<option value="ko">ko</option>
<option value="vi">vi</option>
</select>
/sorting
<span class="right-links" id="useraccount">Login</span>
<span id="title">
<a id='title-Bubble' class='selected-viz'>Bubble</a>
<a id='title-Selection'>Select</a>
<a id='title-Insertion'>Insert</a>
<a id='title-Merge'>Merge</a>
<a id='title-Quick'>Quick</a>
<a id='title-RandomizedQuick'>R-Quick</a>
<a id='title-Counting'>Count</a>
<a id='title-Radix'>Radix</a>
</span>
<div id="mode-menu">
<div id='mode-button' title='exploration'>Exploration Mode &#9663;</div>
<div id='other-modes'>
<a title='e-Lecture'>e-Lecture Mode</a>
</div>
</div>
</div>
<div id="dark-overlay"></div>
<div id="status" class="panel"><p></p></div>
<div id="status-hide" class="panel-hide"><img src="https://visualgo.net/img/arrow_white_right.png" alt=">" title="show/hide status panel" /></div>
<div id="codetrace" class="panel">
<p id="code1" style="padding-top: 10px;"></p>
<p id="code2"></p>
<p id="code3"></p>
<p id="code4"></p>
<p id="code5"></p>
<p id="code6"></p>
<p id="code7" style="padding-bottom: 10px;"></p>
</div>
<div id="codetrace-hide" class="panel-hide"><img src="https://visualgo.net/img/arrow_white_right.png" alt=">" title="show/hide codetrace panel" /></div>
<div id="left-bar"></div>
<div id="right-bar"></div>
<div id="media-controls">
<div id='speed-control'>slow<div id='speed-input'></div>fast</div>
<span id="go-to-beginning" class="media-control-button" title="go to beginning" onclick=goToBeginning()><img src="https://visualgo.net/img/goToBeginning.png" alt="go to beginning"></span>
<span id="previous" class="media-control-button" title="step backward" onclick=stepBackward()><img src="https://visualgo.net/img/prevFrame.png" alt="previous frame"></span>
<span id="pause" class="media-control-button" title="pause" onclick=pause()><img src="https://visualgo.net/img/pause.png" alt="pause"></span>
<span id="play" class="media-control-button" title="play" onclick=play()><img src="https://visualgo.net/img/play.png" alt="play"></span>
<span id="next" class="media-control-button" title="step forward" onclick=stepForward()><img src="https://visualgo.net/img/nextFrame.png" alt="next frame"></span>
<span id="go-to-end" class="media-control-button" title="go to end" onclick=goToEnd()><img src="https://visualgo.net/img/goToEnd.png" alt="go to end"></span>
<div id="progress-bar" class="media-control-button"></div>
</div>
<div id='e-lecture' class='panel'></div>
<div id="overlay" hidden></div>
<div id="dropdown-temp-holder" hidden></div>
<div id="electure-1" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>Sorting is a very classic problem of reordering items (that can be compared, e.g. integers, floating-point numbers, strings, etc) of an array (or a list) in a certain order (increasing, non-decreasing, decreasing, non-increasing, lexicographical, etc).</p><br><p>There are many different sorting algorithms, each has its own advantages and limitations.</p><br><p>Sorting is commonly used as the introductory problem in various Computer Science classes to showcase a range of algorithmic ideas.</p><br><p>Without loss of generality, we assume that we will sort only <b>Integers</b>, not necessarily distinct, in <b>non-decreasing order</b> in this visualization. Try clicking <span class="slide-actions" onclick="doButtonAction11()">Bubble Sort</span> for a sample animation of sorting the list of 5 jumbled integers (with duplicate) above.</p><br><p>Click &#39;Next&#39; (on the top right)/press &#39;Page Down&#39; to advance this e-Lecture slide, use the drop down list/press &#39;Space&#39; to jump to a specific slide, or Click &#39;X&#39; (on the bottom right)/press &#39;Esc&#39; to go to Exploration mode.</p>
<hr>
<p><b>Remarks</b>: By default, we show e-Lecture Mode for first time (or non logged-in) visitor.<br>
Please <a href="https://visualgo.net/login"><u>login</u></a> if you are a repeated visitor or <a href="https://visualgo.net/login"><u>register</u></a> for an (optional) free account first.</p>
<div id='electure-dropdown'>
<select class="lecture-dropdown" style="width:100%">
<option value="1">1. Sorting Problem and Sorting Algorithms</option>
<option value="1-1">&nbsp;&nbsp;&nbsp;1-1. Motivation - Interesting CS Ideas</option>
<option value="1-2">&nbsp;&nbsp;&nbsp;1-2. Motivation - Applications</option>
<option value="2">2. Actions</option>
<option value="2-1">&nbsp;&nbsp;&nbsp;2-1. Define Your Own Input</option>
<option value="2-2">&nbsp;&nbsp;&nbsp;2-2. Execute the Selected Sorting Algorithm</option>
<option value="3">3. Visualisation</option>
<option value="4">4. Common Sorting Algorithms</option>
<option value="4-1">&nbsp;&nbsp;&nbsp;4-1. Abbreviations</option>
<option value="5">5. 3 O(N^2) Comparison-based Sorting Algorithms</option>
<option value="6">6. Bubble Sort</option>
<option value="6-1">&nbsp;&nbsp;&nbsp;6-1. Bubble Sort: Analysis</option>
<option value="6-2">&nbsp;&nbsp;&nbsp;6-2. Bubble Sort: Early Termination</option>
<option value="6-3">&nbsp;&nbsp;&nbsp;6-3. The Answer</option>
<option value="7">7. Selection Sort</option>
<option value="7-1">&nbsp;&nbsp;&nbsp;7-1. Selection Sort, C++ Code &amp; Analysis</option>
<option value="7-2">&nbsp;&nbsp;&nbsp;7-2. Mini Quiz</option>
<option value="8">8. Insertion Sort</option>
<option value="8-1">&nbsp;&nbsp;&nbsp;8-1. Insertion Sort, C++ Code and Analysis 1</option>
<option value="8-2">&nbsp;&nbsp;&nbsp;8-2. Insertion Sort: Analysis 2</option>
<option value="8-3">&nbsp;&nbsp;&nbsp;8-3. Mini Quiz</option>
<option value="9">9. 2.5 O(N log N) Comparison-based Sorting</option>
<option value="10">10. Merge Sort</option>
<option value="10-1">&nbsp;&nbsp;&nbsp;10-1. Important Subroutine, O(N) Merge</option>
<option value="10-2">&nbsp;&nbsp;&nbsp;10-2. Merge Subroutine C++ Implementation</option>
<option value="10-3">&nbsp;&nbsp;&nbsp;10-3. Divide and Conquer Paradigm</option>
<option value="10-4">&nbsp;&nbsp;&nbsp;10-4. Merge Sort as a D&C Algorithm</option>
<option value="10-5">&nbsp;&nbsp;&nbsp;10-5. Merge Sort C++ Implementation</option>
<option value="10-6">&nbsp;&nbsp;&nbsp;10-6. Demonstration</option>
<option value="10-7">&nbsp;&nbsp;&nbsp;10-7. Merge Sort: Analysis Part 1</option>
<option value="10-8">&nbsp;&nbsp;&nbsp;10-8. Merge Sort: Analysis Part 2</option>
<option value="10-9">&nbsp;&nbsp;&nbsp;10-9. Merge Sort: Analysis Part 3</option>
<option value="10-10">&nbsp;&nbsp;&nbsp;10-10. Pros and Cons</option>
<option value="11">11. Quick Sort</option>
<option value="11-1">&nbsp;&nbsp;&nbsp;11-1. Quick Sort as a D&amp;C Algorithm</option>
<option value="11-2">&nbsp;&nbsp;&nbsp;11-2. Important Sub-routine, O(N) Partition</option>
<option value="11-3">&nbsp;&nbsp;&nbsp;11-3. The Answer</option>
<option value="11-4">&nbsp;&nbsp;&nbsp;11-4. Partition - Continued</option>
<option value="11-5">&nbsp;&nbsp;&nbsp;11-5. Partition - Case when a[k] &ge; p</option>
<option value="11-6">&nbsp;&nbsp;&nbsp;11-6. Partition - Case when a[k] &lt; p</option>
<option value="11-7">&nbsp;&nbsp;&nbsp;11-7. Partition C++ Implementation</option>
<option value="11-8">&nbsp;&nbsp;&nbsp;11-8. Quick Sort C++ Implementation</option>
<option value="11-9">&nbsp;&nbsp;&nbsp;11-9. Demonstration</option>
<option value="11-10">&nbsp;&nbsp;&nbsp;11-10. Quick Sort: Analysis Part 1</option>
<option value="11-11">&nbsp;&nbsp;&nbsp;11-11. Quick Sort: Analysis Part 2</option>
<option value="11-12">&nbsp;&nbsp;&nbsp;11-12. Quick Sort: Analysis Part 3</option>
<option value="11-13">&nbsp;&nbsp;&nbsp;11-13. Quick Sort: Best Case (Rare)</option>
<option value="12">12. Random Quick Sort</option>
<option value="12-1">&nbsp;&nbsp;&nbsp;12-1. Magical Analysis</option>
<option value="13">13. 2 O(N) Non Comparison-based Sorting Algorithms</option>
<option value="13-1">&nbsp;&nbsp;&nbsp;13-1. Lower Bound of Sorting Algorithm</option>
<option value="14">14. Counting Sort</option>
<option value="15">15. Radix Sort</option>
<option value="15-1">&nbsp;&nbsp;&nbsp;15-1. The Best Sorting Algorithm for Integers?</option>
<option value="16">16. Additional Properties of Sorting Algorithms</option>
<option value="16-1">&nbsp;&nbsp;&nbsp;16-1. In-Place Sorting</option>
<option value="16-2">&nbsp;&nbsp;&nbsp;16-2. Stable Sort</option>
<option value="16-3">&nbsp;&nbsp;&nbsp;16-3. Caching Performance</option>
<option value="17">17. Quizzes</option>
<option value="17-1">&nbsp;&nbsp;&nbsp;17-1. Quiz #1</option>
<option value="17-2">&nbsp;&nbsp;&nbsp;17-2. Quiz #2</option>
<option value="18">18. Extras</option>
<option value="18-1">&nbsp;&nbsp;&nbsp;18-1. Challenge</option>
<option value="18-2">&nbsp;&nbsp;&nbsp;18-2. Inversion Index/Count</option>
<option value="18-3">&nbsp;&nbsp;&nbsp;18-3. Implementation</option>
<option value="18-4">&nbsp;&nbsp;&nbsp;18-4. Online Quiz</option>
<option value="18-5">&nbsp;&nbsp;&nbsp;18-5. Online Judge Exercises</option>
<option value="99">99. Status Panel</option>
<option value="99-1">&nbsp;&nbsp;&nbsp;99-1. Codetrace Panel</option>
<option value="99-2">&nbsp;&nbsp;&nbsp;99-2. Media Control</option>
<option value="99-3">&nbsp;&nbsp;&nbsp;99-3. Return to &#39;Exploration Mode&#39;</option>
</select>
</div>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-next' data-nextid="1-1">Next <u>PgDn</u></div>
</div>
<div id="electure-1-1" class="electure-dialog" style="top:60px;left:60px;width:500px;">
<p>Sorting problem has a variety of interesting algorithmic solutions that embody many Computer Science ideas:</p><ol><li><a href="?slide=5"><u>Comparison</u></a> versus <a href="?slide=13"><u>non-comparison</u></a> based strategies,</li><li>Iterative versus Recursive implementation,</li><li>Divide-and-Conquer paradigm (<a href="?slide=10-4"><u>this</u></a> or <a href="?slide=11-1"><u>that</u></a>),</li><li>Best/Worst/Average-case Time Complexity analysis,</li><li><a href="?slide=12"><u>Randomized Algorithms</u></a>, etc.</li></ol>
<hr>
<p>Pro-tip: Since you are not <a href="https://visualgo.net/login"><u>logged-in</u></a>, you may be a first time visitor who are not aware of the following keyboard shortcuts to navigate this e-Lecture mode: <b>[PageDown]</b> to advance to the next slide, <b>[PageUp]</b> to go back to the previous slide, <b>[Esc]</b> to toggle between this e-Lecture mode and exploration mode.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="1">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="1-2">Next <u>PgDn</u></div>
</div>
<div id="electure-1-2" class="electure-dialog" style="top:60px;left:60px;width:500px;">
<p>When an (integer) array <b>A</b> is sorted, many problems involving <b>A</b> become easy (or easier):</p><ol><li>Searching for a specific value <b>v</b> in array <b>A</b>,</li><li>Finding the min/max or the k-th smallest/largest value in (static) array <b>A</b>,</li><li>Testing for uniqueness and deleting duplicates in array <b>A</b>,</li><li>Counting how many time a specific value <b>v</b> appear in array <b>A</b>,</li><li>Set intersection/union between array <b>A</b> and another sorted array <b>B</b>,</li><li>Finding a target pair <b>x</b> ∈ <b>A</b> and <b>y</b> ∈ <b>A</b> such that <b>x+y</b> equals to a target <b>z</b>, etc.</li></ol><p>Discussion: In real-life classes, the instructor may elaborate more on these applications.</p>
<hr>
<p>Another pro-tip: We designed this visualization and this e-Lecture mode to look good on 1366x768 resolution <b>or larger</b> (typical modern laptop resolution in 2017). We recommend using Google Chrome to access VisuAlgo. Go to full screen mode (<b>F11</b>) to enjoy this setup. However, you can use zoom-in (<b>Ctrl +</b>) or zoom-out (<b>Ctrl -</b>) to calibrate this.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="1-1">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="2">Next <u>PgDn</u></div>
</div>
<div id="electure-2" class="electure-dialog" style="bottom:140px;left:60px;width:500px;">
<p>There are two actions that you can do in this visualization.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="1-2">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="2-1">Next <u>PgDn</u></div>
</div>
<div id="electure-2-1" class="electure-dialog" style="bottom:140px;left:60px;width:500px;">
<p>The first action is about defining <b>your own</b> input, an array/a list that is:</p><ol><li>Totally random,</li><li>Random but sorted (in ascending/descending order),</li><li>Random but <b>nearly</b> sorted (in ascending/descending order), or</li><li>Defined solely by yourself.</li></ol><p>In Exploration mode, you can experiment with various sorting algorithms provided in this visualization to figure out their best and worst case inputs.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="2">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="2-2">Next <u>PgDn</u></div>
</div>
<div id="electure-2-2" class="electure-dialog" style="bottom:140px;left:60px;width:500px;">
<p>The second action is the most important one: Execute the active sorting algorithm by clicking "Sort" menu and then clicking "Go".</p><br><p>Remember that you can switch active algorithm by clicking the <a href="?slide=4-1"><u>respective abbreviation</u></a> on the top side of this visualization page.</p><br><p>Some sorting algorithms have certain additional options. You may toggle the options as you wish before clicking "Go". For example, in Bubble Sort (and Merge Sort), there is an option to also compute the <b>inversion index</b> of the input array (this is an <a href="?slide=16-4"><u>advanced topic</u></a>).</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="2-1">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="3">Next <u>PgDn</u></div>
</div>
<div id="electure-3" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>View the visualisation/animation of the chosen sorting algorithm here.</p><br><p>Without loss of generality, we only show Integers in this visualization and our objective is to sort them from the initial state into ascending order state.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="2-2">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="4">Next <u>PgDn</u></div>
</div>
<div id="electure-4" class="electure-dialog" style="top:60px;left:220px;width:500px;">
<p>At the top, you will see the list of commonly taught sorting algorithms in Computer Science classes. To activate each algorithm, select the <a href="?slide=4-1"><u>abbreviation</u></a> of respective algorithm name before clicking "Sort &rarr; Go".</p><br><p>To facilitate more diversity, we randomize the active algorithm upon each page load.</p><br><p>The first six algorithms are <b>comparison-based</b> sorting algorithms while the last two are not. We will discuss this idea <a href="?slide=13"><u>midway through</u></a> this e-Lecture.</p><br><p>The middle three algorithms are <b>recursive</b> sorting algorithms while the rest are usually implemented iteratively.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="3">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="4-1">Next <u>PgDn</u></div>
</div>
<div id="electure-4-1" class="electure-dialog" style="top:60px;left:220px;width:500px;">
<p>To save screen space, we abbreviate algorithm names into three characters each:</p><ol><li>Comparison-based Sorting Algorithms:<ol><li>BUB - Bubble Sort,</li><li>SEL - Selection Sort,</li><li>INS - Insertion Sort,</li><li>MER - Merge Sort (recursive implementation),</li><li>QUI - Quick Sort (recursive implementation),</li><li>R-Q - Random Quick Sort (recursive implementation).</li></ol></li><li>Not Comparison-based Sorting Algorithms:<ol><li>COU - Counting Sort,</li><li>RAD - Radix Sort.</li></ol></li></ol>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="4">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="5">Next <u>PgDn</u></div>
</div>
<div id="electure-5" class="electure-dialog" style="top:60px;left:60px;width:500px;">
<p>We will discuss three comparison-based sorting algorithms in the next few slides:</p><ol><li><a href="?slide=6"><u>Bubble Sort</u></a>,</li><li><a href="?slide=7"><u>Selection Sort</u></a>,</li><li><a href="?slide=8"><u>Insertion Sort</u></a>.</li></ol><p>They are called <b>comparison-based</b> as they compare pairs of elements of the array and decide whether to swap them or not.</p><br><p>These three sorting algorithms are the easiest to implement but also not the most efficient, as they run in O(<b>N</b><sup>2</sup>).</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="4-1">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="6">Next <u>PgDn</u></div>
</div>
<div id="electure-6" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>Given an array of <b>N</b> elements, Bubble Sort will:</p><ol><li><b>Compare</b> a pair of adjacent items (a, b),</li><li>Swap that pair if the items are out of order (in this case, when a &gt; b),</li><li>Repeat Step 1 and 2 until we reach the end of array<br>(the last pair is the (<b>N</b>-2)-th and (<b>N</b>-1)-th items as we use 0-based indexing),</li><li>By now, the largest item will be at the last position.<br>We then reduce <b>N</b> by 1 and repeat Step 1 until we have <b>N = 1</b>.</li></ol><p>Without further ado, let&#39;s try <span class="slide-actions" onclick="doButtonAction11()">Bubble Sort</span> on the small example array [29, 10, 14, 37, 14].</p><br><p>You should see a &#39;bubble-like&#39; animation if you imagine the larger items &#39;bubble up&#39; (actually &#39;float to the right side of the array&#39;).</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="5">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="6-1">Next <u>PgDn</u></div>
</div>
<div id="electure-6-1" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>Comparison and swap require time that is bounded by a constant, let&#39;s call it <b>c</b>.</p><br><p>There are two nested loops in (the standard) Bubble Sort.</p><br><p>The outer loop runs for exactly <b>N</b> iterations.<br>But the inner loop runs get shorter and shorter:</p><ol><li>When i=0, (<b>N</b>−1) iterations (of comparisons and possibly swaps),</li><li>When i=1, (<b>N</b>−2) iterations,<br>...,</li><li>When i=(<b>N</b>−2), 1 iteration,</li><li>When i=(<b>N</b>−1), 0 iteration.</li></ol><p>Thus, the total number of iterations = (<b>N</b>−1)+(<b>N</b>−2)+...+1+0 = <b>N</b>*(<b>N</b>−1)/2 (<a href="https://en.wikipedia.org/wiki/Arithmetic_progression#Sum" target="_blank"><u>derivation</u></a>).</p><p>Total time = c*<b>N</b>*(<b>N</b>−1)/2 = O(<b>N</b>^2).</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="6">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="6-2">Next <u>PgDn</u></div>
</div>
<div id="electure-6-2" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>Bubble Sort is actually inefficient with its <b>O(N^2)</b> time complexity. Imagine that we have <b>N</b> = 10<sup>5</sup> numbers. Even if our computer is super fast and can compute 10<sup>8</sup> operations in 1 second, Bubble Sort will need about 100 seconds to complete.</p><p><br></p><p>However, it can be terminated early, e.g. try <span class="slide-actions" onclick="doButtonAction11()">Bubble Sort</span> on the small sorted ascending example shown above [3, 6, 11, 25, 39] where it terminates in O(<b>N</b>) time.</p><br><p>The improvement idea is simple: If we go through the inner loop with <b>no swapping</b> at all, it means that the array is <b>already sorted</b> and we can stop Bubble Sort at that point.</p><br><p>Discussion: Although it makes Bubble Sort runs faster in general cases, this improvement idea does not change <b>O(N^2)</b> time complexity of Bubble Sort... Why?</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="6-1">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="6-3">Next <u>PgDn</u></div>
</div>
<div id="electure-6-3" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<div style="background-color: white; color: black;">
<p>e-Lecture: The content of this slide is hidden and only available for legitimate CS lecturer worldwide. Drop an email to visualgo.info at gmail dot com if you want to activate this CS lecturer-only feature <b>and you are really a CS lecturer (show your University staff profile)</b>.</p>
</div>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="6-2">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="7">Next <u>PgDn</u></div>
</div>
<div id="electure-7" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>Given an array of <b>N</b> items and <b>L</b> = 0, Selection Sort will:</p><ol><li>Find the position <b>X</b> of the smallest item&nbsp;in the range of [<b>L</b>...<b>N</b>−1],</li><li>Swap <b>X</b>-th item with the <b>L</b>-th item,</li><li>Increase the lower-bound <b>L</b> by 1 and repeat Step 1 until <b>L</b> = <b>N</b>-2.</li></ol><p>Without further ado, let&#39;s try <span class="slide-actions" onclick="doButtonAction8()">Selection Sort</span> on the same small example array [29, 10, 14, 37, 13].</p><br><p>Without loss of generality, we can also implement Selection Sort in reverse:<br>Find the position of the largest item <b>Y</b> and swap it with the last item.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="6-3">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="7-1">Next <u>PgDn</u></div>
</div>
<div id="electure-7-1" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<pre>void selectionSort(int a[], int N) {<br>  for (int L = 0; L &lt;= N-2; ++L) { // O(<b>N</b>)<br>    int X = min_element(a+L, a+N) - a; // O(<b>N</b>)<br>    swap(a[X], a[L]); // O(1), X may be equal to L (no actual swap)<br>  }<br>}</pre><p>Total: O(<b>N</b><sup>2</sup>) — To be precise, it is similar to <a href="?slide=5-1"><u>Bubble Sort analysis</u></a>.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="7">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="7-2">Next <u>PgDn</u></div>
</div>
<div id="electure-7-2" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<input class="mcq-answer" id="mcq-answer-4" value="26" hidden><p>Quiz: <b>How many (real) swaps are required to sort [29, 10, 14, 37, 13] by Selection Sort?</b></p><form><input type="radio" name="mcq-4-choice" value="25"> 2<br><input type="radio" name="mcq-4-choice" value="26"> 3<br><input type="radio" name="mcq-4-choice" value="27"> 4<br><input type="radio" name="mcq-4-choice" value="24"> 1<br></form><button class="mcq-submit" id="submit-4">Submit</button> <span id="answer-status-4"></span>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="7-1">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="8">Next <u>PgDn</u></div>
</div>
<div id="electure-8" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>Insertion sort is similar to how most people arrange a hand of poker cards. <img src="https://puu.sh/vfi6a/e532309371.png" alt="Poker hand"></p><ol><li>Start with one card in your hand,</li><li>Pick the next card and insert it into its proper sorted order,</li><li>Repeat previous step for all cards.</li></ol><p>Without further ado, let&#39;s try <span class="slide-actions" onclick="doButtonAction10()">Insertion Sort</span> on the small example array [40, 13, 20, 8].</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="7-2">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="8-1">Next <u>PgDn</u></div>
</div>
<div id="electure-8-1" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<pre>void insertionSort(int a[], int N) {<br>  for (int i = 1; i &lt; N; ++i) { // O(N)<br>    int X = a[i]; // X is the item to be inserted<br>    int j = i-1;<br>    for (; j &gt;= 0 &amp;&amp; a[j] &gt; X; --j) // can be fast or slow<br>      a[j+1] = a[j]; // make a place for X<br>    a[j+1] = X; // index j+1 is the insertion point<br>  }<br>}</pre>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="8">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="8-2">Next <u>PgDn</u></div>
</div>
<div id="electure-8-2" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>The outer loop executes <b>N</b>−1 times, that&#39;s quite clear.</p><br><p>But the number of times the inner-loop is executed depends on the input:</p><ol><li>In best-case scenario, the array is already sorted and (a[j] &gt; X) is always false<br>So no shifting of data is necessary and the inner loop runs in O(<b>1</b>),</li><li>In worst-case scenario, the array is reverse sorted and (a[j] &gt; X) is always true<br>Insertion always occur at the front of the array and the inner loop runs in O(<b>N</b>).</li></ol><p>Thus, the best-case time is O(<b>N &times; 1</b>) = O(<b>N</b>) and the worst-case time is O(<b>N &times; N</b>) = O(<b>N</b><sup>2</sup>).</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="8-1">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="8-3">Next <u>PgDn</u></div>
</div>
<div id="electure-8-3" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<input class="mcq-answer" id="mcq-answer-5" value="31" hidden><p>Quiz: <b>What is the complexity of Insertion Sort on any input array?</b></p><form><input type="radio" name="mcq-5-choice" value="29"> O(N)<br><input type="radio" name="mcq-5-choice" value="31"> O(N^2)<br><input type="radio" name="mcq-5-choice" value="28"> O(1)<br><input type="radio" name="mcq-5-choice" value="30"> O(N log N)<br></form><button class="mcq-submit" id="submit-5">Submit</button> <span id="answer-status-5"></span><br><br><p>Ask your instructor if you are not clear on this or read similar remarks on <a href="?slide=10-10"><u>this slide</u></a>.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="8-2">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="9">Next <u>PgDn</u></div>
</div>
<div id="electure-9" class="electure-dialog" style="top:60px;left:60px;width:500px;">
<p>We will discuss two (+half) comparison-based sorting algorithms in the next few slides:</p><ol><li><a href="?slide=10"><u>Merge Sort</u></a>,</li><li><a href="?slide=11"><u>Quick Sort</u></a> and its <a href="?slide=12"><u>Randomized version</u></a> (which only has one change).</li></ol><p>These sorting algorithms are usually implemented recursively, use Divide and Conquer problem solving paradigm, and run in O(<b>N</b> log <b>N</b>) time for Merge Sort and O(<b>N</b> log <b>N</b>) time <i>in expectation</i> for Randomized Quick Sort.</p><br><p>PS: The the non-randomized version of Quick Sort runs in O(<b>N<sup>2</sup></b>) though.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="8-3">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="10">Next <u>PgDn</u></div>
</div>
<div id="electure-10" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>Given an array of <b>N</b> items, Merge Sort will:</p><ol><li>Merge each pair of individual element (which is by default, sorted) into sorted arrays of 2 elements,</li><li>Merge each pair of sorted arrays of 2 elements into sorted arrays of 4 elements,<br>Repeat the process...,</li><li>Final step: Merge 2 sorted arrays of <b>N</b>/2 elements (for simplicity of this discussion, we assume that <b>N</b> is even) to obtain a fully sorted array of <b>N</b> elements.</li></ol><p>This is just the general idea and we need a few more details before we can discuss the true form of Merge Sort.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="9">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="10-1">Next <u>PgDn</u></div>
</div>
<div id="electure-10-1" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>We will dissect this Merge Sort algorithm by first discussing its most important sub-routine: The O(<b>N</b>) <samp>merge</samp>.</p><br><p>Given two sorted array, A and B, of size <b>N<sub>1</sub></b> and <b>N<sub>2</sub></b>, we can efficiently merge them into one larger combined sorted array of size <b>N</b> = <b>N<sub>1</sub></b>+<b>N<sub>2</sub></b>, in O(<b>N</b>) time.</p><br><p>This is achieved by simply comparing the front of the two arrays and take the smaller of the two at all times. However, this simple but fast O(<b>N</b>) <samp>merge</samp> sub-routine will need additional array to do this merging correctly. See the next slide.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="10">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="10-2">Next <u>PgDn</u></div>
</div>
<div id="electure-10-2" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<pre>void merge(int a[], int low, int mid, int high) {<br>  // subarray1 = a[low..mid], subarray2 = a[mid+1..high], both sorted<br>  int N = high-low+1;<br>  int b[N]; // discuss: why do we need a temporary array b?<br>  int left = low, right = mid+1, bIdx = 0;<br>  while (left &lt;= mid &amp;&amp; right &lt;= high) // the merging<br>    b[bIdx++] = (a[left] &lt;= a[right]) ? a[left++] : a[right++];<br>  while (left &lt;= mid) b[bIdx++] = a[left++]; // leftover, if any<br>  while (right &lt;= high) b[bIdx++] = a[right++]; // leftover, if any<br>  for (int k = 0; k &lt; N; k++) a[low+k] = b[k]; // copy back<br>}<br></pre><p>Try <span class="slide-actions" onclick="doButtonAction12()">Merge Sort</span> on the example array [1, 5, 19, 20, 2, 11, 15, 17] that have its first half already sorted [1, 5, 19, 20] and its second half also already sorted [2, 11, 15, 17]. Concentrate on the last merge of the Merge Sort algorithm.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="10-1">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="10-3">Next <u>PgDn</u></div>
</div>
<div id="electure-10-3" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>Before we continue, let&#39;s talk about Divide and Conquer (abbreviated as D&amp;C), a powerful problem solving paradigm.</p><br><p>Divide and Conquer algorithm solves (certain kind of) problem — like our sorting problem — in the following steps:</p><ol><li>Divide step: Divide the large, original problem into smaller sub-problems and recursively solve the smaller sub-problems,</li><li>Conquer step: Combine the results of the smaller sub-problems to produce the result of the larger, original problem.</li></ol>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="10-2">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="10-4">Next <u>PgDn</u></div>
</div>
<div id="electure-10-4" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>Merge Sort is a Divide and Conquer sorting algorithm.</p><br><p>The divide step is simple: Divide the current array into two halves (perfectly equal if <b>N</b> is even or one side is slightly greater by one element if <b>N</b> is odd) and then recursively sort the two halves.</p><br><p>The conquer step is the one that does the most work: Merge the two (sorted) halves to form a sorted array, using the merge sub-routine <a href="?slide=10-2"><u>discussed earlier</u></a>.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="10-3">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="10-5">Next <u>PgDn</u></div>
</div>
<div id="electure-10-5" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<pre>void mergeSort(int a[], int low, int high) {<br>  // the array to be sorted is a[low..high]<br>  if (low &lt; high) { // base case: low &gt;= high (0 or 1 item)<br>    int mid = (low+high) / 2;	<br>    mergeSort(a, low  , mid ); // divide into two halves<br>    mergeSort(a, mid+1, high); // then recursively sort them<br>    merge(a, low, mid, high); // conquer: the merge subroutine<br>  }<br>}</pre>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="10-4">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="10-6">Next <u>PgDn</u></div>
</div>
<div id="electure-10-6" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>Please try <span class="slide-actions" onclick="doButtonAction12()">Merge Sort</span> on the example array [7, 2, 6, 3, 8, 4, 5] to see more details.</p><br><p>Contrary to what many other CS printed textbooks usually show (as textbooks are static), the actual execution of Merge Sort does <b>not</b> split to two subarrays <b>level by level</b>, but it will recursively sort the <b>left</b> subarray first before dealing with the <b>right</b> subarray.</p><br><p>That&#39;s it, on the example array [7, 2, 6, 3, 8, 4, 5], it will recurse to [7, 2, 6, 3], then [7, 2], then [7] (a single element, sorted by default), backtrack, recurse to [2] (sorted), backtrack, then finally merge [7, 2] into [2, 7], before it continue processing [6, 3] and so on.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="10-5">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="10-7">Next <u>PgDn</u></div>
</div>
<div id="electure-10-7" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>In Merge Sort, the bulk of work is done in the conquer/merge step as the divide step does not really do anything (treated as O(<b>1</b>)).</p><br><p>When we call <samp>merge(a, low, mid, high)</samp>, we process <b>k = (high-low+1)</b> items.<br>There will be at most <b>k-1</b> comparisons.<br>There are <b>k</b> moves from original array <b>a</b> to temporary array <b>b</b> and another <b>k</b> moves back.<br>In total, number of operations inside <samp>merge</samp> sub-routine is &lt; 3<b>k</b>-1 = O(<b>k</b>).</p><br><p>The important question is how many times this <samp>merge</samp> sub-routine is called?</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="10-6">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="10-8">Next <u>PgDn</u></div>
</div>
<div id="electure-10-8" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<img src="https://visualgo.net/img/merge.png" width="500" alt="The Recursion Tree of Merge Sort">
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="10-7">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="10-9">Next <u>PgDn</u></div>
</div>
<div id="electure-10-9" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>Level 1: 2^0=1 calls to merge() with <b>N</b>/2^1 items each, O(2^0 x 2 x <b>N</b>/2^1) = O(<b>N</b>)<br>Level 2: 2^1=2 calls to merge() with <b>N</b>/2^2 items each, O(2^1 x 2 x <b>N</b>/2^2) = O(<b>N</b>)<br>Level 3: 2^2=4 calls to merge() with <b>N</b>/2^3 items each, O(2^2 x 2 x <b>N</b>/2^3) = O(<b>N</b>)<br>...<br>Level (log <b>N</b>): 2^(log <b>N</b>-1) (or <b>N</b>/2) calls to merge() with <b>N</b>/2^log <b>N</b> (or 1) item each, O(<b>N</b>)</p><br><p>There are log <b>N</b> levels and in each level, we perform O(<b>N</b>) work, thus the overall time complexity is O(<b>N</b> log <b>N</b>). We will <a href="?slide=13-1"><u>later</u></a> see that this is an optimal (comparison-based) sorting algorithm, i.e. we cannot do better than this.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="10-8">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="10-10">Next <u>PgDn</u></div>
</div>
<div id="electure-10-10" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>The most important good part of Merge Sort is its O(<b>N</b> log <b>N</b>) performance guarantee, regardless of the original ordering of the input. That&#39;s it, there is <b>no</b> adversary test case that can make Merge Sort runs longer than O(<b>N</b> log <b>N</b>) for <b>any</b> array of <b>N</b> elements.</p><br><p>Merge Sort is therefore very suitable to sort extremely large number of inputs as O(<b>N</b> log <b>N</b>) grows much slower than the O(<b>N</b><sup>2</sup>) sorting algorithms that we have <a href="?slide=5"><u>discussed earlier</u></a>.</p><br><p>Merge Sort is also a <a href="?slide=16-2"><u>stable sort</u></a> algorithm. Discussion: Why?</p><br><p>There are however, several not-so-good parts of Merge Sort. First, it is actually not easy to implement from scratch (<a href="?slide=18-2"><u>but we don&#39;t have to</u></a>). Second, it requires additional O(<b>N</b>) storage during <a href="?slide=10-2"><u>merging operation</u></a>, thus not really memory efficient and <a href="?slide=16-1"><u>not in-place</u></a>. Btw, if you are interested to see what have been done to address these (classic) Merge Sort not-so-good parts, you can read <a href="https://en.wikipedia.org/wiki/Merge_sort#Variants" target="_blank"><u>this</u></a>.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="10-9">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="11">Next <u>PgDn</u></div>
</div>
<div id="electure-11" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>Quick Sort is another Divide and Conquer sorting algorithm (the other one discussed in this visualization page is <a href="?slide=10"><u>Merge Sort</u></a>).</p><br><p>We will see that this deterministic, non randomized version of Quick Sort can have bad time complexity of O(<b>N</b><sup>2</sup>) on adversary input before continuing with the <a href="?slide=12"><u>randomized</u></a> and usable version later.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="10-10">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="11-1">Next <u>PgDn</u></div>
</div>
<div id="electure-11-1" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>Divide step: Choose an item <b>p</b> (known as the pivot)<br>Then partition the items of <b>a[i..j]</b> into three parts: <b>a[i..m-1]</b>, <b>a[m]</b>, and <b>a[m+1..j]</b>.<br><b>a[i..m-1]</b> (possibly empty) contains items that are smaller than <b>p</b>.<br><b>a[m]</b> is the pivot <b>p</b>, i.e. index <b>m</b> is the correct position for <b>p</b> in the sorted order of array <b>a</b>.<br><b>a[m+1..j]</b> (possibly empty) contains items that are greater than <i>or equal to</i> <b>p</b>.<br>Then, recursively sort the two parts.</p><br><p>Conquer step: Don&#39;t be surprised... We do nothing :O!</p><br><p>If you compare this with <a href="?slide=10-4"><u>Merge Sort</u></a>, you will see that Quick Sort D&amp;C steps are totally opposite with Merge Sort.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="11">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="11-2">Next <u>PgDn</u></div>
</div>
<div id="electure-11-2" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>We will dissect this Quick Sort algorithm by first discussing its most important sub-routine: The O(<b>N</b>) <samp>partition</samp> (classic version).</p><br><p>To partition <b>a[i..j]</b>, we first choose <b>a[i]</b> as the pivot <b>p</b>.<br></p><p>The remaining items (i.e. <b>a[i+1..j]</b>) are divided into 3 regions:</p><ol><li><b>S1</b> = <b>a[i+1..m]</b> where items are &lt; <b>p</b>,</li><li><b>S2</b> = <b>a[m+1..k-1]</b> where items are &ge; <b>p</b>, and</li><li>Unknown = <b>a[k..j]</b>, where items are yet to be assigned to either <b>S1</b> or <b>S2</b>.</li></ol><p>Discussion: Why do we choose <b>p</b> = <b>a[i]</b>? Are there other choices?</p><br><p>Harder Discussion: Is it good to always put item(s) that is/are == <b>p</b> on S2 at all times?</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="11-1">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="11-3">Next <u>PgDn</u></div>
</div>
<div id="electure-11-3" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<div style="background-color: white; color: black;">
<p>e-Lecture: The content of this slide is hidden and only available for legitimate CS lecturer worldwide. Drop an email to visualgo.info at gmail dot com if you want to activate this CS lecturer-only feature <b>and you are really a CS lecturer (show your University staff profile)</b>.</p>
</div>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="11-2">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="11-4">Next <u>PgDn</u></div>
</div>
<div id="electure-11-4" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>Initially, both <b>S1</b> and <b>S2</b> regions are empty, i.e. all items excluding the designated pivot <b>p</b> are in the unknown region.</p><br><p>Then, for each item <b>a[k]</b> in the unknown region, we compare <b>a[k]</b> with <b>p</b> and decide one of the two cases:</p><ol><li>If <b>a[k]</b> &ge; <b>p</b>, put <b>a[k]</b> into <b>S2</b>, or</li><li>Otherwise, put <b>a[k]</b> into <b>S1</b>.</li></ol><p>These two cases are elaborated in the next two slides.</p><br><p>Lastly, we swap <b>a[i]</b> and <b>a[m]</b> to put pivot <b>p</b> right in the middle of <b>S1</b> and <b>S2</b>.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="11-3">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="11-5">Next <u>PgDn</u></div>
</div>
<div id="electure-11-5" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<img src="https://visualgo.net/img/partition1.png" width="500" alt="Case when a[k] &ge; p, increment k, extend S2 by 1 item">
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="11-4">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="11-6">Next <u>PgDn</u></div>
</div>
<div id="electure-11-6" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<img src="https://visualgo.net/img/partition2.png" width="500" alt="Case when a[k] &lt; p, increment m, swap a[k] with a[m], increment k, extend S1 by 1 item">
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="11-5">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="11-7">Next <u>PgDn</u></div>
</div>
<div id="electure-11-7" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<pre>int partition(int a[], int i, int j) {<br>  int p = a[i]; // p is the pivot<br>  int m = i; // S1 and S2 are initially empty<br>  for (int k = i+1; k &lt;= j; k++) { // explore the unknown region<br>    if (a[k] &lt; p) { // case 2<br>      m++;<br>      swap(a[k], a[m]); // C++ STL algorithm std::swap<br>    } // notice that we do nothing in case 1: a[k] &gt;= p<br>  }<br>  swap(a[i], a[m]); // final step, swap pivot with a[m]<br>  return m; // return the index of pivot<br>}</pre>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="11-6">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="11-8">Next <u>PgDn</u></div>
</div>
<div id="electure-11-8" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<pre>void quickSort(int a[], int low, int high) {<br>  if (low &lt; high) {<br>    int m = partition(a, low, high); // O(N)<br>    // a[low..high] ~&gt; a[low..m–1], pivot, a[m+1..high]<br>    quickSort(a, low, m-1); // recursively sort left subarray<br>    // a[m] = pivot is already sorted after partition<br>    quickSort(a, m+1, high); // then sort right subarray<br>  }<br>}</pre>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="11-7">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="11-9">Next <u>PgDn</u></div>
</div>
<div id="electure-11-9" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>Try <span class="slide-actions" onclick="doButtonAction13()">Quick Sort</span> on example array [27, 38, 12, 39, 27, 16]. We shall elaborate the first partition step as follows:<br>We set <b>p = a[0] = 27</b>.<br>We set <b>a[1] = 38</b> as part of <b>S2</b> so <b>S1 = {}</b> and <b>S2 = {38}</b>.<br>We swap <b>a[1] = 38</b> with <b>a[2] = 12</b> so <b>S1 = {12}</b> and <b>S2 = {38}</b>.<br>We set <b>a[3] = 39</b> and later <b>a[4] = 27</b> as part of <b>S2</b> so <b>S1 = {12}</b> and <b>S2 = {38,39,27}</b>.<br>We swap <b>a[2] = 38</b> with <b>a[5] = 16</b> so <b>S1 = {12,16}</b> and <b>S2 = {39,27,38}</b>.<br>We swap <b>p = a[0] = 27</b> with <b>a[2] = 16</b> so <b>S1 = {16,12}</b>, <b>p = {27}</b>, and <b>S2 = {39,27,38}</b>.</p><br><p>After this, <b>a[2] = 27</b> is guaranteed to be sorted and now Quick Sort recursively sorts the left side <b>a[0..1]</b> first and later recursively sorts the right side <b>a[3..5]</b>.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="11-8">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="11-10">Next <u>PgDn</u></div>
</div>
<div id="electure-11-10" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>First, we analyze the cost of one call of <samp>partition</samp>.</p><br><p>Inside <samp>partition(a, i, j)</samp>, there is only a single for-loop that iterates through (j-i) times. As j can be as big as <b>N</b>-1 and i can be as low as 0, then the time complexity of partition is O(<b>N</b>).</p><br><p>Similar to <a href="?slide=10-7"><u>Merge Sort analysis</u></a>, the time complexity of Quick Sort is then dependent on the number of times <samp>partition(a, i, j)</samp> is called.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="11-9">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="11-11">Next <u>PgDn</u></div>
</div>
<div id="electure-11-11" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>When the array <b>a</b> is already in ascending order, like the example above, Quick Sort will set <b>p = a[0] = 5</b>, and will return <b>m = 0</b>, thereby making <b>S1</b> region <b>empty</b> and <b>S2</b> region: Everything else other than the pivot (<b>N</b>-1 items).</p><br><p>Try <span class="slide-actions" onclick="doButtonAction13()">Quick Sort</span> on example input array [5, 18, 23, 39, 44, 50].</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="11-10">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="11-12">Next <u>PgDn</u></div>
</div>
<div id="electure-11-12" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>On such worst case input scenario, this is what happens:</p><br><img src="https://visualgo.net/img/qsort_worstcase.png" width="250" alt="Worst Case analysis of Quick Sort"><br><p>The first partition takes O(<b>N</b>) time, splits <b>a</b> into 0, 1, <b>N</b>-1 items, then recurse right.<br>The second one takes O(<b>N</b>-1) time, splits <b>a</b> into 0, 1, <b>N</b>-2 items, then recurse right again.<br>...<br>Until the last, <b>N</b>-th partition splits <b>a</b> into 0, 1, 1 item, and Quick Sort recursion stops.<br></p><br><p>This is the classic <b>N+(N-1)+(N-2)+...+1</b> pattern, which is O(<b>N</b><sup>2</sup>), similar analysis as the one <a href="?slide=6-1"><u>in this slide</u></a>...</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="11-11">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="11-13">Next <u>PgDn</u></div>
</div>
<div id="electure-11-13" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>The best case scenario of Quick Sort occurs when partition always splits the array into <b>two equal halves</b>, like <a href="?slide=10-8"><u>Merge Sort</u></a>.</p><br><p>When that happens, the depth of recursion is only O(log <b>N</b>).</p><br><p>As each level takes O(<b>N</b>) comparisons, the time complexity is O(<b>N</b> log <b>N</b>).</p><br><p>Try <span class="slide-actions" onclick="doButtonAction13()">Quick Sort</span> on this hand-crafted example input array [4, 1, 3, 2, 6, 5, 7].<br>In practice, this is rare, thus we need to devise a better way: <a href="?slide=12"><u>Randomized Quick Sort</u></a>.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="11-12">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="12">Next <u>PgDn</u></div>
</div>
<div id="electure-12" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>Same as <b>Quick Sort</b> except just before executing the partition algorithm, it <b>randomly</b> select the pivot between <b>a[i..j]</b> instead of always choosing <b>a[i]</b> (or any other fixed index between <b>[i..j]</b>) deterministically.</p><br><p>Try <span class="slide-actions" onclick="doButtonAction14()">Random Quick Sort</span> on this large and somewhat random example array.</p><br><p>Mini exercise: Implement the idea above to the implementation shown in <a href="?slide=11-7"><u>this slide</u></a>!</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="11-13">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="12-1">Next <u>PgDn</u></div>
</div>
<div id="electure-12-1" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p>It will take about 1 hour lecture to properly explain why this randomized version of Quick Sort has expected time complexity of O(<b>N</b> log <b>N</b>) on <b>any</b> input array of <b>N</b> elements.</p><br><p>In this e-Lecture, we will assume that it is true.</p><br><p>If you need non formal explanation: Just imagine that on randomized version of Quick Sort that randomizes the pivot selection, we will <b>not</b> always get extremely bad split of 0 (empty), 1 (pivot), and <b>N</b>-1 other items. This combination of lucky (half-pivot-half), somewhat lucky, somewhat unlucky, and extremely unlucky (empty, pivot, the rest) yields an average time complexity of O(<b>N</b> log <b>N</b>).</p><br><p>Discussion: Actually the phrase "<b>any input array</b>" above is not fully true. There is actually a way to make the randomized version of Quick Sort <i>as currently presented in this VisuAlgo page</i> still runs in O(<b>N<sup>2</sup></b>). How?</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="12">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="13">Next <u>PgDn</u></div>
</div>
<div id="electure-13" class="electure-dialog" style="top:60px;left:60px;width:500px;">
<p>We will discuss two <b>non comparison-based</b> sorting algorithms in the next few slides:</p><ol><li><a href="?slide=14"><u>Counting Sort</u></a>,</li><li><a href="?slide=15"><u>Radix Sort</u></a>.</li></ol><p>These sorting algorithms can be faster than the lower bound of comparison-based sorting algorithm of &Omega;(<b>N</b> log <b>N</b>) by <b>not</b> comparing the items of the array.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="12-1">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="13-1">Next <u>PgDn</u></div>
</div>
<div id="electure-13-1" class="electure-dialog" style="top:60px;left:60px;width:500px;">
<p>It is known (also not proven in this visualization as it will take another 1 hour lecture to do so) that all <b>comparison-based</b> sorting algorithms have a lower bound time complexity of Ω(<b>N</b> log <b>N</b>).</p><br><p>Thus, any comparison-based sorting algorithm with worst-case complexity O(<b>N</b> log <b>N</b>), like <a href="?slide=10-9"><u>Merge Sort</u></a> is considered an optimal algorithm, i.e. we cannot do better than that.</p><br><p>However, we can achieve faster sorting algorithm — i.e. in O(<b>N</b>) — if certain assumptions of the input array exist and thus we can avoid comparing the items to determine the sorted order.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="13">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="14">Next <u>PgDn</u></div>
</div>
<div id="electure-14" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p><b>Assumption</b>: If the items to be sorted are <b>Integers with small range</b>, we can count the frequency of occurrence of each Integer (in that small range) and then loop through that small range to output the items in sorted order.</p><br><p>Try <span class="slide-actions" onclick="doButtonAction15()">Counting Sort</span> on the example array above where all Integers are within [1..9], thus we just need to count how many times Integer 1 appears, Integer 2 appears, ..., Integer 9 appears, and then loop through 1 to 9 to print out <b>x</b> copies of Integer <b>y</b> if frequency[<b>y</b>] = <b>x</b>.</p><br><p>The time complexity is O(<b>N</b>) to count the frequencies and O(<b>N+k</b>) to print out the output in sorted order where <b>k</b> is the range of the input Integers, which is 9-1+1 = 9 in this example. The time complexity of Counting Sort is thus O(<b>N+k</b>), which is O(<b>N</b>) if <b>k</b> is small.</p><br><p>We will not be able to do the counting part of Counting Sort when <b>k</b> is relatively big due to memory limitation, as we need to store frequencies of those <b>k</b> integers.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="13-1">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="15">Next <u>PgDn</u></div>
</div>
<div id="electure-15" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<p><b>Assumption</b>: If the items to be sorted are <b>Integers with large range but of few digits</b>, we can combine <a href="?slide=14"><u>Counting Sort</u></a> idea with Radix Sort to achieve the linear time complexity.</p><br><p>In Radix Sort, we treat each item to be sorted as a string of <b>w</b> digits (we pad Integers that have less than <b>w</b> digits with leading zeroes if necessary).</p><br><p>For the least significant (rightmost) digit to the most significant digit (leftmost), we pass through the <b>N</b> items and put them according to the active digit into 10 Queues (one for each digit [0..9]), which is like a <i>modified</i> Counting Sort as this one preserves <a href="?slide=16-2"><u>stability</u></a>. Then we re-concatenate the groups again for subsequent iteration.</p><br><p>Try <span class="slide-actions" onclick="doButtonAction16()">Radix Sort</span> on the example array above for clearer explanation.</p><br><p>Notice that we only perform O(<b>w &times; (N+k)</b>) iterations. In this example, <b>w = 4</b> and <b>k = 10</b>.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="14">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="15-1">Next <u>PgDn</u></div>
</div>
<div id="electure-15-1" class="electure-dialog" style="top:310px;left:50%;margin-left:-250px;width:500px;">
<div style="background-color: white; color: black;">
<p>e-Lecture: The content of this slide is hidden and only available for legitimate CS lecturer worldwide. Drop an email to visualgo.info at gmail dot com if you want to activate this CS lecturer-only feature <b>and you are really a CS lecturer (show your University staff profile)</b>.</p>
</div>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="15">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="16">Next <u>PgDn</u></div>
</div>
<div id="electure-16" class="electure-dialog" style="top:60px;left:60px;width:500px;">
<p>There are a few other properties that can be used to differentiate sorting algorithms on top of whether they are comparison or non-comparison, recursive or iterative.</p><br><p>In this section, we will talk about in-place versus not in-place, stable versus not stable, and caching performance of sorting algorithms.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="15-1">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="16-1">Next <u>PgDn</u></div>
</div>
<div id="electure-16-1" class="electure-dialog" style="top:60px;left:60px;width:500px;">
<p>A sorting algorithm is said to be an <b>in-place sorting</b> algorithm if it requires only a constant amount (i.e. O(<b>1</b>)) of extra space during the sorting process. That&#39;s it, a few, constant number of extra variables is OK but we are not allowed to have variables that has variable length depending on the input size <b>N</b>.</p><br><p><a href="?slide=10-2"><u>Merge Sort</u></a> (the classic version), due to its <samp>merge</samp> sub-routine that requires additional temporary array of size <b>N</b>, is not in-place.</p><br><p>Discussion: How about Bubble Sort, Selection Sort, Insertion Sort, Quick Sort (randomized or not), Counting Sort, and Radix Sort. Which ones are in-place?</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="16">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="16-2">Next <u>PgDn</u></div>
</div>
<div id="electure-16-2" class="electure-dialog" style="top:60px;left:60px;width:500px;">
<p>A sorting algorithm is called <b>stable</b> if the relative order of elements <b>with the same key value</b> is preserved by the algorithm after sorting is performed.</p><br><p>Example application of stable sort: Assume that we have student names that have been sorted in alphabetical order. Now, if this list is sorted again by tutorial group number (recall that one tutorial group usually has many students), a stable sort algorithm would ensure that all students in the same tutorial group still appear in alphabetical order of their names.</p><br><p>Discussion: Which of the sorting algorithms discussed in this e-Lecture are stable?<br>Try sorting array A = {3, 4a, 2, 4b, 1}, i.e. there are two copies of 4 (4a first, then 4b).</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="16-1">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="16-3">Next <u>PgDn</u></div>
</div>
<div id="electure-16-3" class="electure-dialog" style="top:60px;left:60px;width:500px;">
<div style="background-color: white; color: black;">
<p>e-Lecture: The content of this slide is hidden and only available for legitimate CS lecturer worldwide. Drop an email to visualgo.info at gmail dot com if you want to activate this CS lecturer-only feature <b>and you are really a CS lecturer (show your University staff profile)</b>.</p>
</div>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="16-2">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="17">Next <u>PgDn</u></div>
</div>
<div id="electure-17" class="electure-dialog" style="top:60px;left:60px;width:500px;">
<p>We are nearing the end of this e-Lecture.</p><br><p>Time for a few simple questions.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="16-3">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="17-1">Next <u>PgDn</u></div>
</div>
<div id="electure-17-1" class="electure-dialog" style="top:60px;left:60px;width:500px;">
<input class="mcq-answer" id="mcq-answer-1" value="5" hidden><p>Quiz: <b>Which of these algorithms run in O(N log N) on any input array of size N?</b></p><form><input type="radio" name="mcq-1-choice" value="5"> Merge Sort<br><input type="radio" name="mcq-1-choice" value="3"> Insertion Sort<br><input type="radio" name="mcq-1-choice" value="2"> Bubble Sort<br><input type="radio" name="mcq-1-choice" value="4"> Quick Sort (Deterministic)<br></form><button class="mcq-submit" id="submit-1">Submit</button> <span id="answer-status-1"></span>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="17">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="17-2">Next <u>PgDn</u></div>
</div>
<div id="electure-17-2" class="electure-dialog" style="top:60px;left:60px;width:500px;">
<input class="msq-answer" id="msq-answer-3" value="13,15,16" hidden><p>Quiz: <b>Which of these algorithms has worst case time complexity of Θ(N^2) for sorting N integers?</b></p><input type="checkbox" class="msq-choice" id="msq-3-choice-13"> Bubble Sort<br><input type="checkbox" class="msq-choice" id="msq-3-choice-23"> Radix Sort<br><input type="checkbox" class="msq-choice" id="msq-3-choice-16"> Selection Sort<br><input type="checkbox" class="msq-choice" id="msq-3-choice-15"> Insertion Sort<br><input type="checkbox" class="msq-choice" id="msq-3-choice-14"> Merge Sort<br><button class="msq-submit" id="submit-3">Submit</button> <span id="answer-status-3"></span><br><br><p>Θ is a tight time complexity analysis where the best case &Omega; and the worst case big-O analysis match.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="17-1">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="18">Next <u>PgDn</u></div>
</div>
<div id="electure-18" class="electure-dialog" style="top:60px;left:60px;width:500px;">
<p>We have reached the end of sorting e-Lecture.</p><br><p>However, there are two other sorting algorithms in VisuAlgo that are embedded in other data structures: <a href="./heap"><u>Heap Sort</u></a> and <a href="./bst"><u>Balanced BST Sort</u></a>. We will discuss them when you go through the e-Lecture of those two data structures.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="17-2">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="18-1">Next <u>PgDn</u></div>
</div>
<div id="electure-18-1" class="electure-dialog" style="top:60px;left:60px;width:500px;">
<div style="background-color: white; color: black;">
<p>e-Lecture: The content of this slide is hidden and only available for legitimate CS lecturer worldwide. Drop an email to visualgo.info at gmail dot com if you want to activate this CS lecturer-only feature <b>and you are really a CS lecturer (show your University staff profile)</b>.</p>
</div>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="18">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="18-2">Next <u>PgDn</u></div>
</div>
<div id="electure-18-2" class="electure-dialog" style="top:60px;left:60px;width:500px;">
<div style="background-color: white; color: black;">
<p>e-Lecture: The content of this slide is hidden and only available for legitimate CS lecturer worldwide. Drop an email to visualgo.info at gmail dot com if you want to activate this CS lecturer-only feature <b>and you are really a CS lecturer (show your University staff profile)</b>.</p>
</div>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="18-1">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="18-3">Next <u>PgDn</u></div>
</div>
<div id="electure-18-3" class="electure-dialog" style="top:60px;left:60px;width:500px;">
<p>Actually, the C++ source code for many of these basic sorting algorithms are already scattered throughout these e-Lecture slides. For other programming languages, you can translate the given C++ source code to the other programming language.</p><br><p>Usually, sorting is just a small part in problem solving process and nowadays, most of programming languages have their own sorting functions so we don&#39;t really have to re-code them <i>unless absolutely necessary</i>.</p><br><p>In C++, you can use <a href="http://en.cppreference.com/w/cpp/algorithm/sort" target="_blank"><u>std::sort</u></a>, <a href="http://en.cppreference.com/w/cpp/algorithm/stable_sort" target="_blank"><u>std::stable_sort</u></a>, or <a href="http://en.cppreference.com/w/cpp/algorithm/partial_sort" target="_blank"><u>std::partial_sort</u></a> in STL algorithm.<br>In Python, you can use <a href="https://docs.python.org/3/library/stdtypes.html#list.sort" target="_blank"><u>sort</u></a>.<br>In Java, you can use <a href="https://docs.oracle.com/javase/9/docs/api/java/util/Collections.html#sort-java.util.List-" target="_blank"><u>Collections.sort</u></a>.</p><br><p>If the comparison function is problem-specific, we may need to supply additional comparison function to those built-in sorting routines.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="18-2">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="18-4">Next <u>PgDn</u></div>
</div>
<div id="electure-18-4" class="electure-dialog" style="top:60px;left:60px;width:500px;">
<p>Note: Please <span class="slide-actions" onclick="doButtonAction19()">Sign up/Login</span> before attempting the training!</p><br><p><span class="slide-actions" onclick="doButtonAction17()">Test your understanding here!</span></p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="18-3">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="18-5">Next <u>PgDn</u></div>
</div>
<div id="electure-18-5" class="electure-dialog" style="top:60px;left:60px;width:500px;">
<p>Now that you have reached the end of this e-Lecture, do you think sorting problem is just as simple as calling built-in sort routine?</p><br><p>Try these online judge problems to find out more:<br><a href="https://open.kattis.com/problems/mjehuric" target="_blank"><u>Kattis - mjehuric</u></a><br><a href="https://open.kattis.com/problems/sortofsorting" target="_blank"><u>Kattis - sortofsorting</u></a>, or<br><a href="https://open.kattis.com/problems/sidewayssorting" target="_blank"><u>Kattis - sidewayssorting</u></a></p><br><p>This is not the end of the topic of sorting. When you explore other topics in VisuAlgo, you will realise that sorting is a pre-processing step for many other advanced algorithms for harder problems, e.g. as the pre-processing step for <a href="./mst"><u>Kruskal&#39;s algorithm</u></a>, creatively used in <a href="./suffixarray"><u>Suffix Array</u></a> data structure, etc.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="18-4">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="99">Next <u>PgDn</u></div>
</div>
<div id="electure-99" class="electure-dialog" style="right:150px;bottom:335px;width:500px;">
<p>As the action is being carried out, each step will be described in the status panel.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="18-5">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="99-1">Next <u>PgDn</u></div>
</div>
<div id="electure-99-1" class="electure-dialog" style="right:170px;bottom:275px;width:180px;">
<div style="background-color: white; color: black;">
<p>e-Lecture: The content of this slide is hidden and only available for legitimate CS lecturer worldwide. Drop an email to visualgo.info at gmail dot com if you want to activate this CS lecturer-only feature <b>and you are really a CS lecturer (show your University staff profile)</b>.</p>
</div>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="99">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="99-2">Next <u>PgDn</u></div>
</div>
<div id="electure-99-2" class="electure-dialog" style="bottom:70px;left:50%;margin-left:-120px;width:260px;">
<p>Control the animation with the player controls! Keyboard shortcuts are:<br></p><div style="margin-top: 8px;"><strong>Spacebar:</strong> play/pause/replay</div><strong>Left/right arrows:</strong> step backward/step forward<br><strong>-/+:</strong> decrease/increase speed<br>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="99-1">Prev <u>PgUp</u></div>
<div class='electure-next' data-nextid="99-3">Next <u>PgDn</u></div>
</div>
<div id="electure-99-3" class="electure-dialog" style="top:70px;right:60px;width:300px;">
<p>Return to &#39;Exploration Mode&#39; to start exploring!</p><br><p>Note that if you notice any bug in this visualization or if you want to request for a new visualization feature, do not hesitate to drop an email to the project leader: Dr Steven Halim via his email address: stevenhalim at gmail dot com.</p>
<div class='electure-end'>X <u>Esc</u></div>
<div class='electure-prev' data-nextid="99-2">Prev <u>PgUp</u></div>
</div>
<div id="popup" hidden>
<div id="popup-content"></div>
<span id="hide-popup" hidden>X <u>Close</u></span>
</div>
<div id="sort-viz">
<svg id="viz-canvas"></svg><br>
<svg id="viz-counting-sort-secondary-canvas"></svg>
<div id="viz-radix-sort-canvas">
<span id="radix-sort-bucket-labels-collection">
<span class="radix-sort-bucket-label">0</span>
<span class="radix-sort-bucket-label">1</span>
<span class="radix-sort-bucket-label">2</span>
<span class="radix-sort-bucket-label">3</span>
<span class="radix-sort-bucket-label">4</span>
<span class="radix-sort-bucket-label">5</span>
<span class="radix-sort-bucket-label">6</span>
<span class="radix-sort-bucket-label">7</span>
<span class="radix-sort-bucket-label">8</span>
<span class="radix-sort-bucket-label">9</span>
</span>
</div>
</div>
<div id="current-action" class="panel"><p></p></div>
<div id="actions" class="panel">
<p id="create">Create</p>
<p id="sort">Sort</p>
</div>
<div id="actions-hide" class="panel-hide"><img src="https://visualgo.net/img/arrow_white_right.png" alt=">" title="show/hide actions panel" /></div>
<div id="actions-extras">
<div class="create action-menu-pullout">
<div id="create-random" class="execAction new-menu-option coloured-menu-option" onclick="createList('random')"><p>Random</p></div>
<div id="create-sorted" class="execAction new-menu-option coloured-menu-option" onclick="triggerSubmenu('sorted')">
<p>Sorted</p>
<div id="create-sorted-increasing" class="execAction coloured-menu-option" onclick="createList('sorted-increasing')"><p>Increasing</p></div>
<div id="create-sorted-decreasing" class="execAction new-menu-option coloured-menu-option" onclick="createList('sorted-decreasing')"><p>Decreasing</p></div>
</div>
<div id="create-nearly-sorted" class="execAction new-menu-option coloured-menu-option" onclick="triggerSubmenu('nearly-sorted')">
<p>Nearly sorted</p>
<div id="create-nearly-sorted-increasing" class="execAction coloured-menu-option" onclick="createList('nearly-sorted-increasing')"><p>Increasing</p></div>
<div id="create-nearly-sorted-decreasing" class="execAction new-menu-option coloured-menu-option" onclick="createList('nearly-sorted-decreasing')"><p>Decreasing</p></div>
</div>
<div id="create-userdefined-input" class="new-menu-option"><input type="text" id="userdefined-input" title="Enter a list of numbers, separated by commas." autocomplete="off" value="3,44,38,5,47,15,36,26,27,2,46,4,19,50,48"></div>
<div id="create-userdefined-go" class="execAction new-menu-option coloured-menu-option" onclick="createList('userdefined')"><p>Go</p></div>
<div id="create-err" class="err"></div>
</div>
<div class="sort action-menu-pullout">
<div id="sort-bubble-merge-inversion" class="execAction new-menu-option coloured-menu-option"><input type="checkbox" id="sort-bubble-merge-inversion-checkbox">&nbsp;Compute Inversion Index</div>
<div id="sort-go" class="execAction new-menu-option coloured-menu-option" onclick="sort()"><p>Go</p></div>
<div id="sort-err" class="err"></div>
</div>
</div>
<div id="bottom-bar">
<a id="trigger-about">About</a>
<a id="trigger-team">Team</a>
<a id="trigger-terms">Terms of use</a>
</div>
<div id="about" class="overlays">
<h4>About</h4><span class='close-overlay'>&#x2715;</span>
<div class='content'>
<p>VisuAlgo was conceptualised in 2011 by Dr Steven Halim as a tool to help his students better understand data structures and algorithms, by allowing them to learn the basics on their own and at their own pace.</p><p>VisuAlgo contains many advanced algorithms that are discussed in Dr Steven Halim&#39;s book (&#39;Competitive Programming&#39;, co-authored with his brother Dr Felix Halim) and beyond. Today, some of these advanced algorithms visualization/animation can only be found in VisuAlgo.</p><p>Though specifically designed for National University of Singapore (NUS) students taking various data structure and algorithm classes (e.g. CS1010, CS1020, CS2010, CS2020, CS3230, and CS3230), as advocators of online learning, we hope that curious minds around the world will find these visualisations useful too.</p><p>VisuAlgo is not designed to work well on small touch screens (e.g. smartphones) from the outset due to the need to cater for many complex algorithm visualizations that require lots of pixels and click-and-drag gestures for interaction. The minimum screen resolution for a respectable user experience is 1024x768 and only the landing page is relatively mobile-friendly.</p><p>VisuAlgo is an ongoing project and more complex visualisations are still being developed.</p><p>The most exciting development is the automated question generator and verifier (the online quiz system) that allows students to test their knowledge of basic data structures and algorithms. The questions are randomly generated via some rules and students&#39; answers are instantly and automatically graded upon submission to our grading server. This online quiz system, when it is adopted by more CS instructors worldwide, should technically eliminate manual basic data structure and algorithm questions from typical Computer Science examinations in many Universities. By setting a small (but non-zero) weightage on passing the online quiz, a CS instructor can (significantly) increase his/her students mastery on these basic questions as the students have virtually infinite number of training questions that can be verified instantly before they take the online quiz. The training mode currently contains questions for 12 visualization modules. We will soon add the remaining 8 visualization modules so that every visualization module in VisuAlgo have online quiz component.</p><p>Another active branch of development is the internationalization sub-project of VisuAlgo. We want to prepare a database of CS terminologies for all English text that ever appear in VisuAlgo system. This is a big task and requires crowdsourcing. Once the system is ready, we will invite VisuAlgo visitors to contribute, especially if you are not a native English speaker. Currently, we have also written public notes about VisuAlgo in various languages:
<a href="https://weibo.com/p/230418436e9ee80102v4rk" target='_blank'><u>zh</u></a>, <a href='https://www.facebook.com/notes/steven-halim/httpidvisualgonet-visualisasi-struktur-data-dan-algoritma-dengan-animasi/10153236934439689' target='_blank'><u>id</u></a>, <a href="https://blog.naver.com/visualgo_nus" target='_blank'><u>kr</u></a>, <a href='https://www.facebook.com/groups/163215593699283/permalink/824003417620494/' target='_blank'><u>vn</u></a>, <a href='http://pantip.com/topic/32736343' target='_blank'><u>th</u></a>.</p>
</div>
</div>
<div id="team" class="overlays">
<h4>Team</h4><span class='close-overlay'>&#x2715;</span>
<div class='content'>
 <p>
<strong><span style='line-height: 150%;'>Project Leader &amp; Advisor (Jul 2011-present)</span></strong><br>
<a href='http://www.comp.nus.edu.sg/~stevenha/' target='_blank'>Dr Steven Halim</a>, Senior Lecturer, School of Computing (SoC), National University of Singapore (NUS)<br>
<a href='http://felix-halim.net/' target='_blank'>Dr Felix Halim</a>, Software Engineer, Google (Mountain View)
</p>
<p>
<strong><span style='line-height: 150%;'>Undergraduate Student Researchers 1 (Jul 2011-Apr 2012)</span></strong><br>
Koh Zi Chun, <a href='http://roticv.rantx.com/' target='_blank'>Victor Loh Bo Huai</a>
</p>
<p>
<strong><span style='line-height: 150%;'>Final Year Project/UROP students 1 (Jul 2012-Dec 2013)</span></strong><br>
Phan Thi Quynh Trang, Peter Phandi, Albert Millardo Tjindradinata, Nguyen Hoang Duy
</p>
<p>
<strong><span style='line-height: 150%;'>Final Year Project/UROP students 2 (Jun 2013-Apr 2014)</span></strong><br>
<a href='http://www.rosemarietan.com/' target='_blank'>Rose Marie Tan Zhao Yun</a>, Ivan Reinaldo
</p>
<p>
<strong><span style='line-height: 150%;'>Undergraduate Student Researchers 2 (May 2014-Jul 2014)</span></strong><br>
Jonathan Irvin Gunawan, Nathan Azaria, Ian Leow Tze Wei, Nguyen Viet Dung, Nguyen Khac Tung, Steven Kester Yuwono, Cao Shengze, Mohan Jishnu
</p>
<p>
<strong><span style='line-height: 150%;'>Final Year Project/UROP students 3 (Jun 2014-Apr 2015)</span></strong><br>
Erin Teo Yi Ling, Wang Zi
</p>
<p>
<strong><span style='line-height: 150%;'>Final Year Project/UROP students 4 (Jun 2016-Dec 2017)</span></strong><br>
Truong Ngoc Khanh, John Kevin Tjahjadi, Gabriella Michelle, Muhammad Rais Fathin Mudzakir
</p>
<p>
List of translators who have contributed &ge;100 translations can be found at <a href="https://visualgo.net/statistics">statistics</a> page.
</p>
<p>
<strong><span style='line-height: 150%;'>Acknowledgements</span></strong><br>
This project is made possible by the generous <a href="http://www.cdtl.nus.edu.sg/teg/" target="_blank">Teaching Enhancement Grant</a> from NUS Centre for Development of Teaching and Learning (CDTL).
</p>
</div>
</div>
<div id="termsofuse" class="overlays">
<h4>Terms of use</h4><span class='close-overlay'>&#x2715;</span>
<div class='content'>
<p>VisuAlgo is free of charge for Computer Science community on earth. If you like VisuAlgo, the only payment that we ask of you is for you to <b>tell the existence of VisuAlgo to other Computer Science students/instructors</b> that you know =) via Facebook, Twitter, course webpage, blog review, email, etc.</p> <p>If you are a data structure and algorithm <b>student/instructor</b>, you are allowed to use this website directly for your classes. If you take screen shots (videos) from this website, you can use the screen shots (videos) elsewhere as long as you cite the URL of this website (http://visualgo.net) and/or list of publications below as reference. However, you are <b>NOT</b> allowed to download VisuAlgo (client-side) files and <b>host it</b> on your own website as it is <b>plagiarism</b>. As of now, we do <b>NOT</b> allow other people to fork this project and create variants of VisuAlgo. Using the offline copy of (client-side) VisuAlgo for your personal usage is fine.</p> <p>Note that VisuAlgo&#39;s online quiz component is by nature has heavy server-side component and there is no easy way to save the server-side scripts and databases locally. Currently, the general public can only use the &#39;training mode&#39; to access these online quiz system. Currently the &#39;test mode&#39; is a more controlled environment for using these randomly generated questions and automatic verification for a <b>real</b> examination in NUS. Other interested CS instructor should contact Steven if you want to try such &#39;test mode&#39;.</p> <p><strong><span style="line-height: 200%;">List of Publications</span></strong></p> <p>This work has been presented briefly at the CLI Workshop at the ACM ICPC World Finals 2012 (Poland, Warsaw) and at the IOI Conference at IOI 2012 (Sirmione-Montichiari, Italy). You can click <a href="http://www.ioinformatics.org/oi/shtm/INFOL099.shtml" target="_blank">this link</a> to read our 2012 paper about this system (it was not yet called VisuAlgo back in 2012).</p><p>This work is done mostly by my past students. The most recent final reports are here: <a href="fyp/erin-report.pdf" target="_blank">Erin</a>, <a href="fyp/wangzi-report.pdf" target="_blank">Wang Zi</a>, <a href="fyp/rose-report.pdf" target="_blank">Rose</a>, <a href="fyp/ivan-report.pdf" target="_blank">Ivan</a>.</p> <p><strong><span style="line-height: 200%;">Bug Reports or Request for New Features</span></strong></p> <p>VisuAlgo is not a finished project. Dr Steven Halim is still actively improving VisuAlgo. If you are using VisuAlgo and spot a bug in any of our visualization page/online quiz tool or if you want to request for new features, please contact Dr Steven Halim. His contact is the concatenation of his name and add gmail dot com.</p>
</div>
</div>

<script src="https://visualgo.net/js/jquery-3.3.1.min.js"></script>
<script>
      var PHP_DOMAIN = "";

      // surprise colour!
      // Referenced to in  home.js and viz.js also
      var colourArray = ["#52bc69", "#d65775"/*"#ed5a7d"*/, "#2ebbd1", "#d9513c", "#fec515", "#4b65ba", "#ff8a27", "#a7d41e"]; // green, pink, blue, red, yellow, indigo, orange, lime

      function disableScroll() { $('html').css('overflow', 'hidden'); }

      function enableScroll() { $('html').css('overflow', 'visible'); }

      function replaceAll(find, replace, str) { return str.replace(new RegExp(find, 'g'), replace); }

      function getColours() {
        var generatedColours = new Array();
        while (generatedColours.length < 4) {
          var n = (Math.floor(Math.random() * colourArray.length));
          if ($.inArray(n, generatedColours) == -1)
            generatedColours.push(n);
        }
        return generatedColours;
      }

      function isOn(value, position) {
        return (value>>position) & 1 === 1;
      }

      function customAlert(msg) {
        $('#custom-alert p').html(msg);
        var m = -1 * ($('#custom-alert').outerHeight()/2);
        $('#custom-alert').css('margin-top', m+'px');
        $('#dark-overlay').fadeIn(function() {
          $('#custom-alert').fadeIn(function() {
            setTimeout(function() {
              $('#custom-alert').fadeOut(function() {
                $('#dark-overlay').fadeOut();
              });
            }, 1000);
          });
        });
      }

      function showLoadingScreen() {
        $('#loading-overlay').show();
        $('#loading-message').show();
      }

      function hideLoadingScreen() {
        $('#loading-overlay').hide();
      }

      function commonAction(retval, msg) {
        //setTimeout(function() {
          if (retval) { // mode == "exploration" && // now not only for exploration mode, but check if this opens other problems
            $('#current-action').show();
            $('#current-action').html(mode == "exploration" ? msg : ("e-Lecture Example (auto play until done)<br>" + msg));
            $('#progress-bar').slider("option", "max", gw.getTotalIteration()-1);
            triggerRightPanels();
            isPlaying = true;
          }
        //}, 500);
      }

      function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split('=');
          if (decodeURIComponent(pair[0]) == variable)
            return decodeURIComponent(pair[1]);
        }
        return "";
      }

      var generatedColours = getColours();
      var surpriseColour = colourArray[generatedColours[0]];
      var colourTheSecond = colourArray[generatedColours[1]];
      var colourTheThird = colourArray[generatedColours[2]];
      var colourTheFourth = colourArray[generatedColours[3]];

      $(function() {
        $('.links').css('background', surpriseColour);
        $('.right-links').css('background', surpriseColour);
        $('#login-go').css('background', surpriseColour);

        $('.colour').css("color", surpriseColour); // name
        $('h4').css("background-color", surpriseColour); // about, contact us etc. button background

        // title
        $('#title a').click(function() {
          $('#title a').removeClass('selected-viz');
          $(this).addClass('selected-viz');
          // temporary quick fix for Google Chrome Aug 2016 issue...
          setTimeout(function(){ document.body.style.zoom = "100.1%"; }, 100); // force resize/redraw...
          setTimeout(function(){ document.body.style.zoom = "100%"; }, 600);
        });

        // overlays stuffs
        $('#trigger-about').click(function() {
          if ($(window).width() > 600) {
            $('#dark-overlay').fadeIn(function() {
              $('#about').fadeIn();
            });
          }
          else
            alert('Sorry, this dialog is too big. Please load it on bigger screen');
        });

        $('#trigger-team').click(function() {
          if ($(window).width() > 600) {
            $('#dark-overlay').fadeIn(function() {
              $('#team').fadeIn();
            });
          }
          else
            alert('Sorry, this dialog is too big. Please load it on bigger screen');
        });

        $('#trigger-terms').click(function() {
          if ($(window).width() > 600) {
            $('#dark-overlay').fadeIn(function() {
              $('#termsofuse').fadeIn();
            });
          }
          else
            alert('Sorry, this dialog is too big. Please load it on bigger screen');
        });

        $('.close-overlay').click(function() {
          $('.overlays').fadeOut(function() {
            $('#dark-overlay').fadeOut();
          });
        });

        $('#dark-overlay').click(function() {
          $('.overlays').fadeOut();
          $('#dark-overlay').fadeOut();
        });

        $.get('/isloggedin', function(data) {
          var isLoggedIn = data['isloggedin'] == '1';
          var element;
          if (isLoggedIn) {
            // element = '<a onclick="verifyLogout()">Logout</a>';
            element = '<a href="https://visualgo.net/profile">Profile</a>'; 
          }
          else {
            element = '<a href="https://visualgo.net/login">Login</a>'
          }
          $('#useraccount').html(element);
        });
      });

      function verifyLogout() {
        // Steven's remarks: use a better 'confirm' than the default :(
        var doesLogout = confirm('Are you sure to logout?');
        if (doesLogout == true) {
          window.location = "https://visualgo.net/logout";
        }
      }

      function checkLogin() {
        $.get('/checklogin', function(data) {
          var url = data['url'];
          window.location.href = '/' + url;
        });
      }

      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-1566631-4', 'auto');
      ga('send', 'pageview');
    </script>

<script src="https://visualgo.net/js/jquery-ui.min.js"></script>

<script src="https://visualgo.net/js/d3.min.js"></script>
<script src="https://visualgo.net/js/viz-1.0.3.js"></script>
<script src="https://visualgo.net/js/visualgo_print.js"></script>
<script src="/js/graph_library.js"></script>
<script>
      function runSlide(slide) {
        if (slide == '1') {
          $("#e-lecture").html("slide " + slide + " (" + 1 + "%)");
          $('#title-Bubble').click();
$("#sort").click().addClass("menu-highlighted");
changeSortType(gw.bubbleSort, "29,10,14,37,14");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '1-1') {
          $("#e-lecture").html("slide " + slide + " (" + 2 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '1-2') {
          $("#e-lecture").html("slide " + slide + " (" + 4 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '2') {
          $("#e-lecture").html("slide " + slide + " (" + 5 + "%)");
          
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '2-1') {
          $("#e-lecture").html("slide " + slide + " (" + 7 + "%)");
          $("#create").click().addClass("menu-highlighted");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '2-2') {
          $("#e-lecture").html("slide " + slide + " (" + 8 + "%)");
          $('#title-Bubble').click();
$("#sort").click().addClass("menu-highlighted");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '3') {
          $("#e-lecture").html("slide " + slide + " (" + 9 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '4') {
          $("#e-lecture").html("slide " + slide + " (" + 11 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '4-1') {
          $("#e-lecture").html("slide " + slide + " (" + 12 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '5') {
          $("#e-lecture").html("slide " + slide + " (" + 14 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '6') {
          $("#e-lecture").html("slide " + slide + " (" + 15 + "%)");
          $('#title-Bubble').click();
$("#sort").click().addClass("menu-highlighted");
changeSortType(gw.bubbleSort, "29,10,14,37,14");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '6-1') {
          $("#e-lecture").html("slide " + slide + " (" + 16 + "%)");
          $('#title-Bubble').click();
$("#sort").click().addClass("menu-highlighted");
changeSortType(gw.bubbleSort, "29,10,14,37,14");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '6-2') {
          $("#e-lecture").html("slide " + slide + " (" + 18 + "%)");
          $('#title-Bubble').click();
$("#sort").click().addClass("menu-highlighted");
changeSortType(gw.bubbleSort, "3,6,11,25,39");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '6-3') {
          $("#e-lecture").html("slide " + slide + " (" + 19 + "%)");
          $('#title-Bubble').click();
$("#sort").click().addClass("menu-highlighted");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '7') {
          $("#e-lecture").html("slide " + slide + " (" + 21 + "%)");
          $('#title-Selection').click();
$("#sort").click().addClass("menu-highlighted");
changeSortType(gw.selectionSort, "29,10,14,37,13");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '7-1') {
          $("#e-lecture").html("slide " + slide + " (" + 22 + "%)");
          $('#title-Selection').click();
$("#sort").click().addClass("menu-highlighted");
changeSortType(gw.selectionSort, "29,10,14,37,13");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '7-2') {
          $("#e-lecture").html("slide " + slide + " (" + 23 + "%)");
          $('#title-Selection').click();
$("#sort").click().addClass("menu-highlighted");
changeSortType(gw.selectionSort, "29,10,14,37,13");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '8') {
          $("#e-lecture").html("slide " + slide + " (" + 25 + "%)");
          $('#title-Insertion').click();
$("#sort").click().addClass("menu-highlighted");
changeSortType(gw.insertionSort, "40,13,20,8");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '8-1') {
          $("#e-lecture").html("slide " + slide + " (" + 26 + "%)");
          $('#title-Insertion').click();
$("#sort").click().addClass("menu-highlighted");
changeSortType(gw.insertionSort, "40,13,20,8");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '8-2') {
          $("#e-lecture").html("slide " + slide + " (" + 28 + "%)");
          $('#title-Insertion').click();
$("#sort").click().addClass("menu-highlighted");
changeSortType(gw.insertionSort, "40,13,20,8");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '8-3') {
          $("#e-lecture").html("slide " + slide + " (" + 29 + "%)");
          $('#title-Insertion').click();
$("#sort").click().addClass("menu-highlighted");
changeSortType(gw.insertionSort, "40,13,20,8");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '9') {
          $("#e-lecture").html("slide " + slide + " (" + 30 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '10') {
          $("#e-lecture").html("slide " + slide + " (" + 32 + "%)");
          $('#title-Merge').click();
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '10-1') {
          $("#e-lecture").html("slide " + slide + " (" + 33 + "%)");
          $('#title-Merge').click();
changeSortType(gw.mergeSort, "1,5,19,20,2,11,15,17");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '10-2') {
          $("#e-lecture").html("slide " + slide + " (" + 35 + "%)");
          $('#title-Merge').click();
changeSortType(gw.mergeSort, "1,5,19,20,2,11,15,17");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '10-3') {
          $("#e-lecture").html("slide " + slide + " (" + 36 + "%)");
          $('#title-Merge').click();
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '10-4') {
          $("#e-lecture").html("slide " + slide + " (" + 38 + "%)");
          $('#title-Merge').click();
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '10-5') {
          $("#e-lecture").html("slide " + slide + " (" + 39 + "%)");
          $('#title-Merge').click();
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '10-6') {
          $("#e-lecture").html("slide " + slide + " (" + 40 + "%)");
          $('#title-Merge').click();
changeSortType(gw.mergeSort, "7,2,6,3,8,4,5");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '10-7') {
          $("#e-lecture").html("slide " + slide + " (" + 42 + "%)");
          $('#title-Merge').click();
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '10-8') {
          $("#e-lecture").html("slide " + slide + " (" + 43 + "%)");
          $('#title-Merge').click();
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '10-9') {
          $("#e-lecture").html("slide " + slide + " (" + 45 + "%)");
          $('#title-Merge').click();
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '10-10') {
          $("#e-lecture").html("slide " + slide + " (" + 46 + "%)");
          
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '11') {
          $("#e-lecture").html("slide " + slide + " (" + 47 + "%)");
          $('#title-Quick').click();
changeSortType(gw.quickSort, "27,38,12,39,27,16");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '11-1') {
          $("#e-lecture").html("slide " + slide + " (" + 49 + "%)");
          $('#title-Quick').click();
changeSortType(gw.quickSort, "27,38,12,39,27,16");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '11-2') {
          $("#e-lecture").html("slide " + slide + " (" + 50 + "%)");
          $('#title-Quick').click();
changeSortType(gw.quickSort, "27,38,12,39,27,16");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '11-3') {
          $("#e-lecture").html("slide " + slide + " (" + 52 + "%)");
          $('#title-Quick').click();
changeSortType(gw.quickSort, "27,38,12,39,27,16");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '11-4') {
          $("#e-lecture").html("slide " + slide + " (" + 53 + "%)");
          $('#title-Quick').click();
changeSortType(gw.quickSort, "27,38,12,39,27,16");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '11-5') {
          $("#e-lecture").html("slide " + slide + " (" + 54 + "%)");
          $('#title-Quick').click();
changeSortType(gw.quickSort, "27,38,12,39,27,16");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '11-6') {
          $("#e-lecture").html("slide " + slide + " (" + 56 + "%)");
          $('#title-Quick').click();
changeSortType(gw.quickSort, "27,38,12,39,27,16");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '11-7') {
          $("#e-lecture").html("slide " + slide + " (" + 57 + "%)");
          $('#title-Quick').click();
changeSortType(gw.quickSort, "27,38,12,39,27,16");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '11-8') {
          $("#e-lecture").html("slide " + slide + " (" + 59 + "%)");
          $('#title-Quick').click();
changeSortType(gw.quickSort, "27,38,12,39,27,16");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '11-9') {
          $("#e-lecture").html("slide " + slide + " (" + 60 + "%)");
          $('#title-Quick').click();
changeSortType(gw.quickSort, "27,38,12,39,27,16");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '11-10') {
          $("#e-lecture").html("slide " + slide + " (" + 61 + "%)");
          $('#title-Quick').click();

          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '11-11') {
          $("#e-lecture").html("slide " + slide + " (" + 63 + "%)");
          $('#title-Quick').click();
changeSortType(gw.quickSort, "5,18,23,39,44,50");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '11-12') {
          $("#e-lecture").html("slide " + slide + " (" + 64 + "%)");
          $('#title-Quick').click();
changeSortType(gw.quickSort, "5,18,23,39,44,50");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '11-13') {
          $("#e-lecture").html("slide " + slide + " (" + 66 + "%)");
          $('#title-Quick').click();
changeSortType(gw.quickSort, "4,1,3,2,6,5,7");
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '12') {
          $("#e-lecture").html("slide " + slide + " (" + 67 + "%)");
          $('#title-RandomizedQuick').click();
changeSortType(gw.randomizedQuickSort, DEFAULT_DATA);
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '12-1') {
          $("#e-lecture").html("slide " + slide + " (" + 69 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '13') {
          $("#e-lecture").html("slide " + slide + " (" + 70 + "%)");
          $('#title-Counting').click();

          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '13-1') {
          $("#e-lecture").html("slide " + slide + " (" + 71 + "%)");
          $('#title-Counting').click();

          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '14') {
          $("#e-lecture").html("slide " + slide + " (" + 73 + "%)");
          $('#title-Counting').click();
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '15') {
          $("#e-lecture").html("slide " + slide + " (" + 74 + "%)");
          $('#title-Radix').click();
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '15-1') {
          $("#e-lecture").html("slide " + slide + " (" + 76 + "%)");
          $('#title-Radix').click();
          showActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '16') {
          $("#e-lecture").html("slide " + slide + " (" + 77 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '16-1') {
          $("#e-lecture").html("slide " + slide + " (" + 78 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '16-2') {
          $("#e-lecture").html("slide " + slide + " (" + 80 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '16-3') {
          $("#e-lecture").html("slide " + slide + " (" + 81 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '17') {
          $("#e-lecture").html("slide " + slide + " (" + 83 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '17-1') {
          $("#e-lecture").html("slide " + slide + " (" + 84 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '17-2') {
          $("#e-lecture").html("slide " + slide + " (" + 85 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '18') {
          $("#e-lecture").html("slide " + slide + " (" + 87 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '18-1') {
          $("#e-lecture").html("slide " + slide + " (" + 88 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '18-2') {
          $("#e-lecture").html("slide " + slide + " (" + 90 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '18-3') {
          $("#e-lecture").html("slide " + slide + " (" + 91 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '18-4') {
          $("#e-lecture").html("slide " + slide + " (" + 92 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '18-5') {
          $("#e-lecture").html("slide " + slide + " (" + 94 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '99') {
          $("#e-lecture").html("slide " + slide + " (" + 95 + "%)");
          
          hideEntireActionsPanel();
 
          showStatusPanel();
          showCodetracePanel();
      
        }
        if (slide == '99-1') {
          $("#e-lecture").html("slide " + slide + " (" + 97 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '99-2') {
          $("#e-lecture").html("slide " + slide + " (" + 98 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
        if (slide == '99-3') {
          $("#e-lecture").html("slide " + slide + " (" + 100 + "%)");
          
          hideEntireActionsPanel();
          hideStatusPanel();
          hideCodetracePanel();
      
        }
      }

      window.onpopstate = function(event) {
        var slide = event.state['slide'];
        openSlide(slide, function() {
          runSlide(slide);
        });
      };

      function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'), sParameterName, i;

        for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');
          if (sParameterName[0] === sParam) return sParameterName[1] === undefined ? true : sParameterName[1];
        }
      };

      function pushState(slideValue) {
        var url = '/bn/sorting';
        if (typeof slideValue != 'undefined' && slideValue != null) url += '?slide=' + slideValue;
        window.history.pushState({slide: slideValue}, "slide " + slideValue, url);
      }

      function showPopup(callback) {
        $('#popup').fadeIn(100, callback);
      }

      function hidePopup(callback) {
        $('#popup').fadeOut(100, callback);
      }

      function showOverlay() {
        $('#overlay').css('opacity', 0.5); 
        $('#overlay').show();
      }

      function hideOverlay() {
        $('#overlay').hide();
        $("#e-lecture").html("");
      }

      function makeOverlayTransparent() {
        $('#overlay').css('opacity', 0);
      }

      function hideSlide(callback) {
        isPlaying = true;
        closeSlide(cur_slide, function() {
          makeOverlayTransparent();
          setTimeout(callback, 700); // don't immediately run the animation, wait for 500ms+ first
        });
      }

      function showSlide() {
        isPlaying = false;
        openSlide(cur_slide);
        showOverlay();
      }

      $(function() {
        var slide = getUrlParameter('slide');
        
        $.get('/hasvisited' + '/sorting', function(data) {
          var hasVisited = data['hasvisited'] == '1';
          if (!hasVisited) {
            var postData = {
              '_token': 'Bd99Jj3qtUmEE7CcC6e4996kJrndYP131G3dkJrR',
              'page': '/sorting'.substring(1),
            };

            $.post("/visitpage", postData, function(data) {
              // non critical request...
            });

            if (typeof slide != undefined && slide != null) {
              cur_slide = slide;
            }

            $("#mode-menu a").trigger("click");
          }
          else {
            if (typeof slide != undefined && slide != null) {
              cur_slide = slide;
              $('#mode-menu a').click();
            }    
          }
        }).fail(function() {
          if (typeof slide != undefined && slide != null) {
            cur_slide = slide;
            $('#mode-menu a').click();
          }
        });

        $('.mcq-submit').click(function() {
          var questionId = parseInt($(this).attr('id').split('-')[1]);
          var answer = $('#mcq-answer-' + questionId).val();
          var userAnswer = $('input[type=radio][name=mcq-'+questionId+'-choice]:checked').val();

          if (answer === userAnswer) {
            $('#answer-status-' + questionId).html('<font color="green"><b>Correct!</b></font>');
          }
          else {
            $('#answer-status-' + questionId).html('<font color="red"><b>Wrong Answer! Try again...</b></font>');
          }
          $('#answer-status-' + questionId).show();
          setTimeout(function() {
            $('#answer-status-' + questionId).fadeOut(1000);
          }, 1000);
        });

        $('.msq-submit').click(function() {
          var questionId = parseInt($(this).attr('id').split('-')[1]);
          var answer = $('#msq-answer-' + questionId).val();

          var answers = [];
          $('input[type=checkbox][class=msq-choice]:checked').each(function() {
            answers.push($(this).attr('id').split('-')[3]);
          });
          answers.sort();
          var userAnswer = answers.join(',');

          if (answer === userAnswer) {
            $('#answer-status-' + questionId).html('<font color="green">Correct!</font>');
          }
          else {
            $('#answer-status-' + questionId).html('<font color="red">Wrong Answer! Try again...</font>');
          }
          $('#answer-status-' + questionId).show();
          setTimeout(function() {
            $('#answer-status-' + questionId).fadeOut(1000);
          }, 1000);
        });

        $('select.lecture-dropdown').change(function() {
          var nextSlide = $(this).val();
          openSlide(nextSlide, function() {
            runSlide(nextSlide);
            pushState(nextSlide);
          });
        });

        $('#hide-popup').click(function() {
          hidePopup();
        });

        $('#popup').hover(function() {
          $('#hide-popup').show();
        }, function() {
          $('#hide-popup').hide();
        });

        $('#electure-1 .electure-next').click(function() {
          hidePopup();
          runSlide('1-1');
          pushState('1-1');
        });
      
        $('#electure-1-1 .electure-next').click(function() {
          hidePopup();
          runSlide('1-2');
          pushState('1-2');
        });
        $('#electure-1-1 .electure-prev').click(function() {
          hidePopup();
          runSlide('1');
          pushState('1');
        });
      
        $('#electure-1-2 .electure-next').click(function() {
          hidePopup();
          runSlide('2');
          pushState('2');
        });
        $('#electure-1-2 .electure-prev').click(function() {
          hidePopup();
          runSlide('1-1');
          pushState('1-1');
        });
      
        $('#electure-2 .electure-next').click(function() {
          hidePopup();
          runSlide('2-1');
          pushState('2-1');
        });
        $('#electure-2 .electure-prev').click(function() {
          hidePopup();
          runSlide('1-2');
          pushState('1-2');
        });
      
        $('#electure-2-1 .electure-next').click(function() {
          hidePopup();
          runSlide('2-2');
          pushState('2-2');
        });
        $('#electure-2-1 .electure-prev').click(function() {
          hidePopup();
          runSlide('2');
          pushState('2');
        });
      
        $('#electure-2-2 .electure-next').click(function() {
          hidePopup();
          runSlide('3');
          pushState('3');
        });
        $('#electure-2-2 .electure-prev').click(function() {
          hidePopup();
          runSlide('2-1');
          pushState('2-1');
        });
      
        $('#electure-3 .electure-next').click(function() {
          hidePopup();
          runSlide('4');
          pushState('4');
        });
        $('#electure-3 .electure-prev').click(function() {
          hidePopup();
          runSlide('2-2');
          pushState('2-2');
        });
      
        $('#electure-4 .electure-next').click(function() {
          hidePopup();
          runSlide('4-1');
          pushState('4-1');
        });
        $('#electure-4 .electure-prev').click(function() {
          hidePopup();
          runSlide('3');
          pushState('3');
        });
      
        $('#electure-4-1 .electure-next').click(function() {
          hidePopup();
          runSlide('5');
          pushState('5');
        });
        $('#electure-4-1 .electure-prev').click(function() {
          hidePopup();
          runSlide('4');
          pushState('4');
        });
      
        $('#electure-5 .electure-next').click(function() {
          hidePopup();
          runSlide('6');
          pushState('6');
        });
        $('#electure-5 .electure-prev').click(function() {
          hidePopup();
          runSlide('4-1');
          pushState('4-1');
        });
      
        $('#electure-6 .electure-next').click(function() {
          hidePopup();
          runSlide('6-1');
          pushState('6-1');
        });
        $('#electure-6 .electure-prev').click(function() {
          hidePopup();
          runSlide('5');
          pushState('5');
        });
      
        $('#electure-6-1 .electure-next').click(function() {
          hidePopup();
          runSlide('6-2');
          pushState('6-2');
        });
        $('#electure-6-1 .electure-prev').click(function() {
          hidePopup();
          runSlide('6');
          pushState('6');
        });
      
        $('#electure-6-2 .electure-next').click(function() {
          hidePopup();
          runSlide('6-3');
          pushState('6-3');
        });
        $('#electure-6-2 .electure-prev').click(function() {
          hidePopup();
          runSlide('6-1');
          pushState('6-1');
        });
      
        $('#electure-6-3 .electure-next').click(function() {
          hidePopup();
          runSlide('7');
          pushState('7');
        });
        $('#electure-6-3 .electure-prev').click(function() {
          hidePopup();
          runSlide('6-2');
          pushState('6-2');
        });
      
        $('#electure-7 .electure-next').click(function() {
          hidePopup();
          runSlide('7-1');
          pushState('7-1');
        });
        $('#electure-7 .electure-prev').click(function() {
          hidePopup();
          runSlide('6-3');
          pushState('6-3');
        });
      
        $('#electure-7-1 .electure-next').click(function() {
          hidePopup();
          runSlide('7-2');
          pushState('7-2');
        });
        $('#electure-7-1 .electure-prev').click(function() {
          hidePopup();
          runSlide('7');
          pushState('7');
        });
      
        $('#electure-7-2 .electure-next').click(function() {
          hidePopup();
          runSlide('8');
          pushState('8');
        });
        $('#electure-7-2 .electure-prev').click(function() {
          hidePopup();
          runSlide('7-1');
          pushState('7-1');
        });
      
        $('#electure-8 .electure-next').click(function() {
          hidePopup();
          runSlide('8-1');
          pushState('8-1');
        });
        $('#electure-8 .electure-prev').click(function() {
          hidePopup();
          runSlide('7-2');
          pushState('7-2');
        });
      
        $('#electure-8-1 .electure-next').click(function() {
          hidePopup();
          runSlide('8-2');
          pushState('8-2');
        });
        $('#electure-8-1 .electure-prev').click(function() {
          hidePopup();
          runSlide('8');
          pushState('8');
        });
      
        $('#electure-8-2 .electure-next').click(function() {
          hidePopup();
          runSlide('8-3');
          pushState('8-3');
        });
        $('#electure-8-2 .electure-prev').click(function() {
          hidePopup();
          runSlide('8-1');
          pushState('8-1');
        });
      
        $('#electure-8-3 .electure-next').click(function() {
          hidePopup();
          runSlide('9');
          pushState('9');
        });
        $('#electure-8-3 .electure-prev').click(function() {
          hidePopup();
          runSlide('8-2');
          pushState('8-2');
        });
      
        $('#electure-9 .electure-next').click(function() {
          hidePopup();
          runSlide('10');
          pushState('10');
        });
        $('#electure-9 .electure-prev').click(function() {
          hidePopup();
          runSlide('8-3');
          pushState('8-3');
        });
      
        $('#electure-10 .electure-next').click(function() {
          hidePopup();
          runSlide('10-1');
          pushState('10-1');
        });
        $('#electure-10 .electure-prev').click(function() {
          hidePopup();
          runSlide('9');
          pushState('9');
        });
      
        $('#electure-10-1 .electure-next').click(function() {
          hidePopup();
          runSlide('10-2');
          pushState('10-2');
        });
        $('#electure-10-1 .electure-prev').click(function() {
          hidePopup();
          runSlide('10');
          pushState('10');
        });
      
        $('#electure-10-2 .electure-next').click(function() {
          hidePopup();
          runSlide('10-3');
          pushState('10-3');
        });
        $('#electure-10-2 .electure-prev').click(function() {
          hidePopup();
          runSlide('10-1');
          pushState('10-1');
        });
      
        $('#electure-10-3 .electure-next').click(function() {
          hidePopup();
          runSlide('10-4');
          pushState('10-4');
        });
        $('#electure-10-3 .electure-prev').click(function() {
          hidePopup();
          runSlide('10-2');
          pushState('10-2');
        });
      
        $('#electure-10-4 .electure-next').click(function() {
          hidePopup();
          runSlide('10-5');
          pushState('10-5');
        });
        $('#electure-10-4 .electure-prev').click(function() {
          hidePopup();
          runSlide('10-3');
          pushState('10-3');
        });
      
        $('#electure-10-5 .electure-next').click(function() {
          hidePopup();
          runSlide('10-6');
          pushState('10-6');
        });
        $('#electure-10-5 .electure-prev').click(function() {
          hidePopup();
          runSlide('10-4');
          pushState('10-4');
        });
      
        $('#electure-10-6 .electure-next').click(function() {
          hidePopup();
          runSlide('10-7');
          pushState('10-7');
        });
        $('#electure-10-6 .electure-prev').click(function() {
          hidePopup();
          runSlide('10-5');
          pushState('10-5');
        });
      
        $('#electure-10-7 .electure-next').click(function() {
          hidePopup();
          runSlide('10-8');
          pushState('10-8');
        });
        $('#electure-10-7 .electure-prev').click(function() {
          hidePopup();
          runSlide('10-6');
          pushState('10-6');
        });
      
        $('#electure-10-8 .electure-next').click(function() {
          hidePopup();
          runSlide('10-9');
          pushState('10-9');
        });
        $('#electure-10-8 .electure-prev').click(function() {
          hidePopup();
          runSlide('10-7');
          pushState('10-7');
        });
      
        $('#electure-10-9 .electure-next').click(function() {
          hidePopup();
          runSlide('10-10');
          pushState('10-10');
        });
        $('#electure-10-9 .electure-prev').click(function() {
          hidePopup();
          runSlide('10-8');
          pushState('10-8');
        });
      
        $('#electure-10-10 .electure-next').click(function() {
          hidePopup();
          runSlide('11');
          pushState('11');
        });
        $('#electure-10-10 .electure-prev').click(function() {
          hidePopup();
          runSlide('10-9');
          pushState('10-9');
        });
      
        $('#electure-11 .electure-next').click(function() {
          hidePopup();
          runSlide('11-1');
          pushState('11-1');
        });
        $('#electure-11 .electure-prev').click(function() {
          hidePopup();
          runSlide('10-10');
          pushState('10-10');
        });
      
        $('#electure-11-1 .electure-next').click(function() {
          hidePopup();
          runSlide('11-2');
          pushState('11-2');
        });
        $('#electure-11-1 .electure-prev').click(function() {
          hidePopup();
          runSlide('11');
          pushState('11');
        });
      
        $('#electure-11-2 .electure-next').click(function() {
          hidePopup();
          runSlide('11-3');
          pushState('11-3');
        });
        $('#electure-11-2 .electure-prev').click(function() {
          hidePopup();
          runSlide('11-1');
          pushState('11-1');
        });
      
        $('#electure-11-3 .electure-next').click(function() {
          hidePopup();
          runSlide('11-4');
          pushState('11-4');
        });
        $('#electure-11-3 .electure-prev').click(function() {
          hidePopup();
          runSlide('11-2');
          pushState('11-2');
        });
      
        $('#electure-11-4 .electure-next').click(function() {
          hidePopup();
          runSlide('11-5');
          pushState('11-5');
        });
        $('#electure-11-4 .electure-prev').click(function() {
          hidePopup();
          runSlide('11-3');
          pushState('11-3');
        });
      
        $('#electure-11-5 .electure-next').click(function() {
          hidePopup();
          runSlide('11-6');
          pushState('11-6');
        });
        $('#electure-11-5 .electure-prev').click(function() {
          hidePopup();
          runSlide('11-4');
          pushState('11-4');
        });
      
        $('#electure-11-6 .electure-next').click(function() {
          hidePopup();
          runSlide('11-7');
          pushState('11-7');
        });
        $('#electure-11-6 .electure-prev').click(function() {
          hidePopup();
          runSlide('11-5');
          pushState('11-5');
        });
      
        $('#electure-11-7 .electure-next').click(function() {
          hidePopup();
          runSlide('11-8');
          pushState('11-8');
        });
        $('#electure-11-7 .electure-prev').click(function() {
          hidePopup();
          runSlide('11-6');
          pushState('11-6');
        });
      
        $('#electure-11-8 .electure-next').click(function() {
          hidePopup();
          runSlide('11-9');
          pushState('11-9');
        });
        $('#electure-11-8 .electure-prev').click(function() {
          hidePopup();
          runSlide('11-7');
          pushState('11-7');
        });
      
        $('#electure-11-9 .electure-next').click(function() {
          hidePopup();
          runSlide('11-10');
          pushState('11-10');
        });
        $('#electure-11-9 .electure-prev').click(function() {
          hidePopup();
          runSlide('11-8');
          pushState('11-8');
        });
      
        $('#electure-11-10 .electure-next').click(function() {
          hidePopup();
          runSlide('11-11');
          pushState('11-11');
        });
        $('#electure-11-10 .electure-prev').click(function() {
          hidePopup();
          runSlide('11-9');
          pushState('11-9');
        });
      
        $('#electure-11-11 .electure-next').click(function() {
          hidePopup();
          runSlide('11-12');
          pushState('11-12');
        });
        $('#electure-11-11 .electure-prev').click(function() {
          hidePopup();
          runSlide('11-10');
          pushState('11-10');
        });
      
        $('#electure-11-12 .electure-next').click(function() {
          hidePopup();
          runSlide('11-13');
          pushState('11-13');
        });
        $('#electure-11-12 .electure-prev').click(function() {
          hidePopup();
          runSlide('11-11');
          pushState('11-11');
        });
      
        $('#electure-11-13 .electure-next').click(function() {
          hidePopup();
          runSlide('12');
          pushState('12');
        });
        $('#electure-11-13 .electure-prev').click(function() {
          hidePopup();
          runSlide('11-12');
          pushState('11-12');
        });
      
        $('#electure-12 .electure-next').click(function() {
          hidePopup();
          runSlide('12-1');
          pushState('12-1');
        });
        $('#electure-12 .electure-prev').click(function() {
          hidePopup();
          runSlide('11-13');
          pushState('11-13');
        });
      
        $('#electure-12-1 .electure-next').click(function() {
          hidePopup();
          runSlide('13');
          pushState('13');
        });
        $('#electure-12-1 .electure-prev').click(function() {
          hidePopup();
          runSlide('12');
          pushState('12');
        });
      
        $('#electure-13 .electure-next').click(function() {
          hidePopup();
          runSlide('13-1');
          pushState('13-1');
        });
        $('#electure-13 .electure-prev').click(function() {
          hidePopup();
          runSlide('12-1');
          pushState('12-1');
        });
      
        $('#electure-13-1 .electure-next').click(function() {
          hidePopup();
          runSlide('14');
          pushState('14');
        });
        $('#electure-13-1 .electure-prev').click(function() {
          hidePopup();
          runSlide('13');
          pushState('13');
        });
      
        $('#electure-14 .electure-next').click(function() {
          hidePopup();
          runSlide('15');
          pushState('15');
        });
        $('#electure-14 .electure-prev').click(function() {
          hidePopup();
          runSlide('13-1');
          pushState('13-1');
        });
      
        $('#electure-15 .electure-next').click(function() {
          hidePopup();
          runSlide('15-1');
          pushState('15-1');
        });
        $('#electure-15 .electure-prev').click(function() {
          hidePopup();
          runSlide('14');
          pushState('14');
        });
      
        $('#electure-15-1 .electure-next').click(function() {
          hidePopup();
          runSlide('16');
          pushState('16');
        });
        $('#electure-15-1 .electure-prev').click(function() {
          hidePopup();
          runSlide('15');
          pushState('15');
        });
      
        $('#electure-16 .electure-next').click(function() {
          hidePopup();
          runSlide('16-1');
          pushState('16-1');
        });
        $('#electure-16 .electure-prev').click(function() {
          hidePopup();
          runSlide('15-1');
          pushState('15-1');
        });
      
        $('#electure-16-1 .electure-next').click(function() {
          hidePopup();
          runSlide('16-2');
          pushState('16-2');
        });
        $('#electure-16-1 .electure-prev').click(function() {
          hidePopup();
          runSlide('16');
          pushState('16');
        });
      
        $('#electure-16-2 .electure-next').click(function() {
          hidePopup();
          runSlide('16-3');
          pushState('16-3');
        });
        $('#electure-16-2 .electure-prev').click(function() {
          hidePopup();
          runSlide('16-1');
          pushState('16-1');
        });
      
        $('#electure-16-3 .electure-next').click(function() {
          hidePopup();
          runSlide('17');
          pushState('17');
        });
        $('#electure-16-3 .electure-prev').click(function() {
          hidePopup();
          runSlide('16-2');
          pushState('16-2');
        });
      
        $('#electure-17 .electure-next').click(function() {
          hidePopup();
          runSlide('17-1');
          pushState('17-1');
        });
        $('#electure-17 .electure-prev').click(function() {
          hidePopup();
          runSlide('16-3');
          pushState('16-3');
        });
      
        $('#electure-17-1 .electure-next').click(function() {
          hidePopup();
          runSlide('17-2');
          pushState('17-2');
        });
        $('#electure-17-1 .electure-prev').click(function() {
          hidePopup();
          runSlide('17');
          pushState('17');
        });
      
        $('#electure-17-2 .electure-next').click(function() {
          hidePopup();
          runSlide('18');
          pushState('18');
        });
        $('#electure-17-2 .electure-prev').click(function() {
          hidePopup();
          runSlide('17-1');
          pushState('17-1');
        });
      
        $('#electure-18 .electure-next').click(function() {
          hidePopup();
          runSlide('18-1');
          pushState('18-1');
        });
        $('#electure-18 .electure-prev').click(function() {
          hidePopup();
          runSlide('17-2');
          pushState('17-2');
        });
      
        $('#electure-18-1 .electure-next').click(function() {
          hidePopup();
          runSlide('18-2');
          pushState('18-2');
        });
        $('#electure-18-1 .electure-prev').click(function() {
          hidePopup();
          runSlide('18');
          pushState('18');
        });
      
        $('#electure-18-2 .electure-next').click(function() {
          hidePopup();
          runSlide('18-3');
          pushState('18-3');
        });
        $('#electure-18-2 .electure-prev').click(function() {
          hidePopup();
          runSlide('18-1');
          pushState('18-1');
        });
      
        $('#electure-18-3 .electure-next').click(function() {
          hidePopup();
          runSlide('18-4');
          pushState('18-4');
        });
        $('#electure-18-3 .electure-prev').click(function() {
          hidePopup();
          runSlide('18-2');
          pushState('18-2');
        });
      
        $('#electure-18-4 .electure-next').click(function() {
          hidePopup();
          runSlide('18-5');
          pushState('18-5');
        });
        $('#electure-18-4 .electure-prev').click(function() {
          hidePopup();
          runSlide('18-3');
          pushState('18-3');
        });
      
        $('#electure-18-5 .electure-next').click(function() {
          hidePopup();
          runSlide('99');
          pushState('99');
        });
        $('#electure-18-5 .electure-prev').click(function() {
          hidePopup();
          runSlide('18-4');
          pushState('18-4');
        });
      
        $('#electure-99 .electure-next').click(function() {
          hidePopup();
          runSlide('99-1');
          pushState('99-1');
        });
        $('#electure-99 .electure-prev').click(function() {
          hidePopup();
          runSlide('18-5');
          pushState('18-5');
        });
      
        $('#electure-99-1 .electure-next').click(function() {
          hidePopup();
          runSlide('99-2');
          pushState('99-2');
        });
        $('#electure-99-1 .electure-prev').click(function() {
          hidePopup();
          runSlide('99');
          pushState('99');
        });
      
        $('#electure-99-2 .electure-next').click(function() {
          hidePopup();
          runSlide('99-3');
          pushState('99-3');
        });
        $('#electure-99-2 .electure-prev').click(function() {
          hidePopup();
          runSlide('99-1');
          pushState('99-1');
        });
      
        $('#electure-99-3 .electure-prev').click(function() {
          hidePopup();
          runSlide('99-2');
          pushState('99-2');
        });
      
 

        // temporary quick fix for Google Chrome Aug 2016 issue..., put at last part so that everything else has been loaded
        // setTimeout(function(){ document.body.style.zoom = "100.1%"; }, 500);
        // setTimeout(function(){ document.body.style.zoom = "100%"; }, 600);
        // I turn it off on 14 June 2018, seems 'ok'?
      });

      function doButtonAction7() {
        POPUP_IMAGE('https://open.kattis.com/images/site-logo');
      }
      function doButtonAction8() {
        SORT();
      }
      function doButtonAction10() {
        SORT();
      }
      function doButtonAction11() {
        SORT();
      }
      function doButtonAction12() {
        SORT();
      }
      function doButtonAction13() {
        SORT();
      }
      function doButtonAction14() {
        SORT();
      }
      function doButtonAction15() {
        SORT();
      }
      function doButtonAction16() {
        SORT();
      }
      function doButtonAction17() {
        URL('../training?diff=Hard&n=10&tl=5&module=sorting');
      }
      function doButtonAction18() {
        POPUP_IMAGE('https://pbs.twimg.com/profile_images/2618373647/image.jpg');
      }
      function doButtonAction19() {
        URL('../login');
      }
      function doButtonAction20() {
        POPUP_IMAGE('https://puu.sh/vfi6a/e532309371.png');
      }
      function doButtonAction33() {
        changeSortType(gw.bubbleSort, "7,6,5,4,3,2,1");
SORT();
      }
      function doButtonAction95() {
        // add your code here
      }

      function adjustPopupToImageSize() {
        var width = $('#popup-image').prop('width');
        var height = $('#popup-image').prop('height');
        $('#popup').width(width + 20);
        $('#popup').height(height + 20);
        if (width == 0 && height == 0) {
          setTimeout(adjustPopupToImageSize, 200);
        } else {
          showPopup();  
        }
      }

      function POPUP_IMAGE(url) {
        $('#popup-content').html('<img id="popup-image" src="' + url + '">');
        adjustPopupToImageSize();
      }

      function URL(url) {
        window.open(url, '_blank');
      }

      // Implement these functions in each visualisation
      // This function will be called before entering e-Lecture Mode
      function ENTER_LECTURE_MODE() {}

      // This function will be called before returning to Explore Mode
      function ENTER_EXPLORE_MODE() {}

      // Lecture action functions
      function CUSTOM_ACTION(action, data, mode) {}
    </script>
<script type="text/javascript">
// Sorting Widget
// original author: Ian Leow Tze Wei

var Sorting = function() {
  // constants
  var HIGHLIGHT_NONE = "lightblue";
  var HIGHLIGHT_STANDARD = "green";
  var HIGHLIGHT_SPECIAL = "#DC143C";
  var HIGHLIGHT_SORTED = "orange";

  var HIGHLIGHT_LEFT = "#3CB371";
  var HIGHLIGHT_RIGHT = "#9932CC";
  var HIGHLIGHT_PIVOT = "yellow";

  var HIGHLIGHT_GRAY = "#CCCCCC";

  var HIGHLIGHT_RAINBOW = [
    "#FF0000",
    "#FF4000",
    "#FF8000",
    "#FFBF00",
    "#FFFF00",
    "#BFFF00",
    "#80FF00",
    "#40FF00",
    //"#00FF00",
    "#00FF40",
    "#00FF80",
    "#00FFBF",
    "#00FFFF",
    "#00BFFF",
    "#0080FF",
    "#0040FF",
    "#0000FF",
    "#4000FF",
    "#8000FF",
    "#BF00FF",
    "#FF00FF"
  ];

  var HIGHLIGHT_BLUESHADES = [
    HIGHLIGHT_GRAY,
    HIGHLIGHT_NONE,
    "#9DC4E8",
    "#8EB1EB",
    "#7E9DED",
    "#6E89EF",
    "#5E76F1",
    "#4F62F4",
    "#3F4FF6",
    "#2F3BF8",
    "#1F27FA",
    "#1014FD",
    "#0000FF",
    "#0000FF",
    "#0000FF",
    "#0000FF",
    "#0000FF",
    "#0000FF",
    "#0000FF",
    "#0000FF",
    "#0000FF"
  ];

  var POSITION_USE_PRIMARY = "a";
  var POSITION_USE_SECONDARY_IN_DEFAULT_POSITION = "b";

  // Objects definition
  var Entry = function(value, highlight, position, secondaryPositionStatus) {
    this.value = value; // number
    this.highlight = highlight; // string, use HIGHLIGHT_ constants
    this.position = position; // number
    this.secondaryPositionStatus = secondaryPositionStatus; // integer, +ve for position overwrite, -ve for absolute postion (-1 for 0th absolution position)
  }

  var Backlink = function(value, highlight, entryPosition, secondaryPositionStatus) {
    this.value = value; // number
    this.highlight = highlight; // string, use HIGHLIGHT_ constants
    this.entryPosition = entryPosition; // number
    this.secondaryPositionStatus = secondaryPositionStatus; // integer, +ve for position overwrite
  }

  var State = function(entries, backlinks, barsCountOffset, status, lineNo) {
    this.entries = entries; // array of Entry's
    this.backlinks = backlinks; // array of Backlink's
    this.barsCountOffset = barsCountOffset; // how many bars to "disregard" (+ve) or to "imagine" (-ve) w.r.t. state.entries.length when calculating the centre position
    this.status = status;
    this.lineNo = lineNo; //integer or array, line of the code to highlight
  }

  //Helpers
  var EntryBacklinkHelper = new Object();
  EntryBacklinkHelper.appendList = function(entries, backlinks, numArray) {
    for (var i = 0; i < numArray.length; i++) {
      EntryBacklinkHelper.append(entries, backlinks, numArray[i]);
    }
  }

  EntryBacklinkHelper.append = function(entries, backlinks, newNumber) {
    entries.push(new Entry(newNumber, HIGHLIGHT_NONE, entries.length, POSITION_USE_PRIMARY));
    backlinks.push(new Backlink(newNumber, HIGHLIGHT_NONE, backlinks.length, POSITION_USE_PRIMARY));
  }

  EntryBacklinkHelper.update = function(entries, backlinks) {
    for (var i = 0; i < backlinks.length; i++) {
      entries[backlinks[i].entryPosition].highlight = backlinks[i].highlight;
      entries[backlinks[i].entryPosition].position = i;
      entries[backlinks[i].entryPosition].secondaryPositionStatus = backlinks[i].secondaryPositionStatus;
    }
  }

  EntryBacklinkHelper.copyEntry = function(oldEntry) {
    return new Entry(oldEntry.value, oldEntry.highlight, oldEntry.position, oldEntry.secondaryPositionStatus);
  }

  EntryBacklinkHelper.copyBacklink = function(oldBacklink) {
    return new Backlink(oldBacklink.value, oldBacklink.highlight, oldBacklink.entryPosition, oldBacklink.secondaryPositionStatus);
  }

  EntryBacklinkHelper.swapBacklinks = function(backlinks, i, j) {
    var swaptemp = backlinks[i];
    backlinks[i] = backlinks[j];
    backlinks[j] = swaptemp;
  }

  var StateHelper = new Object();
  StateHelper.createNewState = function(numArray) {
    var entries = new Array();
    var backlinks = new Array();
    EntryBacklinkHelper.appendList(entries, backlinks, numArray);
    return new State(entries, backlinks, 0, "", 0);
  }

  StateHelper.copyState = function(oldState) {
    var newEntries = new Array();
    var newBacklinks = new Array();
    for (var i = 0; i < oldState.backlinks.length; i++) {
      newEntries.push(EntryBacklinkHelper.copyEntry(oldState.entries[i]));
      newBacklinks.push(EntryBacklinkHelper.copyBacklink(oldState.backlinks[i]));
    }

    var newLineNo = oldState.lineNo;
    if (newLineNo instanceof Array)
      newLineNo = oldState.lineNo.slice();

    return new State(newEntries, newBacklinks, oldState.barsCountOffset, oldState.status, newLineNo);
  }

  StateHelper.updateCopyPush = function(list, stateToPush) {
    EntryBacklinkHelper.update(stateToPush.entries, stateToPush.backlinks);
    list.push(StateHelper.copyState(stateToPush));
  }

  var FunctionList = new Object();
  FunctionList.text_y = function(d) {
    var barHeight = scaler(d.value);
    if (barHeight < 32) return -15;
    return barHeight-15;
  }

  FunctionList.g_transform = function(d) {
    if (d.secondaryPositionStatus == POSITION_USE_PRIMARY)
      return 'translate(' + (centreBarsOffset + d.position * barWidth) + ", " + (maxHeight - scaler(d.value)) + ')';
    else if (d.secondaryPositionStatus == POSITION_USE_SECONDARY_IN_DEFAULT_POSITION)
      return 'translate(' + (centreBarsOffset + d.position * barWidth) + ", " + (maxHeight * 2 + gapBetweenPrimaryAndSecondaryRows - scaler(d.value)) + ')';
    else if (d.secondaryPositionStatus >= 0)
      return 'translate(' + (centreBarsOffset + d.secondaryPositionStatus * barWidth) + ", " + (maxHeight * 2 + gapBetweenPrimaryAndSecondaryRows - scaler(d.value)) + ')';
    else if (d.secondaryPositionStatus < 0)
      return 'translate(' + ((d.secondaryPositionStatus * -1 - 1) * barWidth) + ", " + (maxHeight * 2 + gapBetweenPrimaryAndSecondaryRows - scaler(d.value)) + ')';
    else
      return 'translation(0, 0)'; // error
  }

  FunctionList.radixElement_left = function(d) {
    if (d.secondaryPositionStatus == POSITION_USE_PRIMARY)
      return d.position * 65 + centreBarsOffset + "px";
    return d.secondaryPositionStatus * 65 + 17.5 + "px";
  }

  FunctionList.radixElement_bottom = function(d, i) {
    if (d.secondaryPositionStatus == POSITION_USE_PRIMARY)
      return 500 - 24 + "px";
    //console.log(i + " " + radixSortBucketOrdering[i]);
    return radixSortBucketOrdering[i] * 30 + 5 + "px";
  }

  FunctionList.radixElement_html = function(d) {
    if (d.highlight == HIGHLIGHT_NONE)
      return d.value;

    var text = "" + d.value;
    while (text.length != 4)
      text = " " + text;

    var positionToHighlight = 0; //positionToHighlight = log_to_base_10(d.highlight), assumes d.highlight is power of 10
    var positionCounter = d.highlight;
    while (positionCounter != 1) {
      positionToHighlight++;
      positionCounter /= 10;
    }

    positionToHighlight = 3-positionToHighlight;

    if (text.charAt(positionToHighlight) != " ") {
      text = text.slice(0, positionToHighlight) +
             "<span style='color: #B40404;'>" +
             text.charAt(positionToHighlight) +
             "</span>" +
             text.slice(positionToHighlight+1);
    }

    text = text.trim();
    return text;
  }

  var makePaler = function(hexColor) {
    var red = Math.floor(parseInt(hexColor.slice(1, 3), 16) + 150);
    var green = Math.floor(parseInt(hexColor.slice(3, 5), 16) + 150);
    var blue = Math.floor(parseInt(hexColor.slice(5, 7), 16) + 150);

    if (red > 255) red = 255;
    if (green > 255) green = 255;
    if (blue > 255) blue = 255;

    red = red.toString(16);
    green = green.toString(16);
    blue = blue.toString(16);

    if (red.length == 1) red = "0" + red;
    if (green.length == 1) green = "0" + green;
    if (blue.length == 1) blue = "0" + blue;
    return "#" + red + green + blue;
  }

  // Variables/Settings
  this.currentNumList = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48]; // the default

  var barWidth = 50;
  var maxHeight = 230;
  var gapBetweenBars = 5;
  var maxNumOfElements = 20; //max 20 elements currently
  var gapBetweenPrimaryAndSecondaryRows = 30; // of the bars

  var maxCountingSortElementValue = 9; // Note that this isn't really customizable, as the code for counting sort is written with this value = 9 in mind.
  var maxRadixSortElementValue = 9999; // Note that this isn't really customizable, as the code for radix sort is written with this value = 9999 in mind.
  var maxElementValue = 50; // for all other sorts - this is fully customizable (seriously)

  var graphElementSize = 10; // The width of the square in the side-graph representing 1 element
  var graphElementGap = 2; // The width of the gap between each element in the side-graph
  var graphRowGap = 10; // The height of the gap between each row in the side graph

  //Code body
  var statelist = new Array();
  var secondaryStatelist = new Array();
  var transitionTime = 500;
  var currentStep = 0;
  var animInterval;
  var issPlaying; //so named so as not to mess with the isPlaying in viz.js

  var quickSortUseRandomizedPivot; //true-false flag
  var mergeSortInversionIndexCounter; //used by merge sort to count the inversion inde
  var centreBarsOffset; // x offset to centre the bars in the canvas
  var radixSortBucketOrdering; // used to order the elements inside each bucket (for radix sort). for formatting purposes.

  var isRadixSort = false;
  var isCountingSort = false;

  this.selectedSortFunction;
  // this.useEnhancedBubbleSort = false;
  this.computeInversionIndex = false;

  var canvas = d3.select("#viz-canvas")
                 .attr("height", maxHeight * 2 + gapBetweenPrimaryAndSecondaryRows)
                 .attr("width", barWidth * maxNumOfElements);

  var countingSortSecondaryCanvas = d3.select("#viz-counting-sort-secondary-canvas")
                                      .attr("height", 60)
                                      .attr("width", barWidth * maxNumOfElements);

  var radixSortCanvas = d3.select("#viz-radix-sort-canvas");

  var scaler = d3.scale
                 .linear()
                 .range([0, maxHeight]);

  var drawState = function(stateIndex) {
    if (isRadixSort)
      drawRadixSortCanvas(statelist[stateIndex], secondaryStatelist[stateIndex]);
    else
      drawBars(statelist[stateIndex]);

    $('#status p').html(statelist[stateIndex].status);
    highlightLine(statelist[stateIndex].lineNo);

    if (isCountingSort)
      drawCountingSortCounters(secondaryStatelist[stateIndex]);
  };

  var drawBars = function(state) {
    scaler.domain([0, d3.max(state.entries, function(d) {
      return d.value;
    })]);

    centreBarsOffset = (maxNumOfElements - (state.entries.length - state.barsCountOffset)) * barWidth / 2;

    var canvasData = canvas.selectAll("g").data(state.entries);

    // Exit ==============================
    var exitData = canvasData.exit()
                             .remove();

    // Entry ==============================
    var newData = canvasData.enter()
                            .append("g")
                            .attr("transform", FunctionList.g_transform);

    newData.append("rect")
           .attr("height", 0)
           .attr("width", 0);

    newData.append("text")
           .attr("dy", ".35em")
           .attr("x", (barWidth - gapBetweenBars) / 2)
           .attr("y", FunctionList.text_y)
           .text(function(d) {
             return d.value;
           });

    // Update ==============================
    canvasData.select("text")
              .transition()
              .attr("y", FunctionList.text_y)
              .text(function(d) {
                return d.value;
              });

    canvasData.select("rect")
              .transition()
              .attr("height", function(d) {
                return scaler(d.value);
              })
              .attr("width", barWidth - gapBetweenBars)
              .style("fill", function(d) {
                return d.highlight;
              });

    canvasData.transition()
              .attr("transform", FunctionList.g_transform)
  };

  var drawCountingSortCounters = function(state) {
    var canvasData;
    if (state == null)
      canvasData = countingSortSecondaryCanvas.selectAll("text").data([]);
    else
      canvasData = countingSortSecondaryCanvas.selectAll("text").data(state);

    // Exit ==============================
    var exitData = canvasData
            .exit()
            .remove();

    // Entry ==============================

    var newData = canvasData
            .enter()
            .append("text")
            .attr("dy", ".35em")
            .attr("x", function(d, i) {
              return (i + 5) * barWidth + (barWidth - gapBetweenBars) / 2;
            })
            .attr("y", 20)
            .text(function(d) {
              return d;
            });

    // Update ==============================

    canvasData
            .transition()
            .text(function(d) {
              return d;
            });
  };

  var drawRadixSortCanvas = function(state, secondaryState) {
    centreBarsOffset = (1000 - (state.entries.length * 65 - 10)) / 2; //uh, it's not really bars now, but just reusing the variable - same concept still

    var canvasData = radixSortCanvas.selectAll("div").data(state.entries);
    var radixSortBucketCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    radixSortBucketOrdering = new Array(state.backlinks.length);

    for (var i = 0; i < state.backlinks.length; i++) {
      if (state.backlinks.secondaryPositionStatus != POSITION_USE_PRIMARY)
        radixSortBucketOrdering[state.backlinks[i].entryPosition] = radixSortBucketCount[state.backlinks[i].secondaryPositionStatus]++;
    }

    // Handle the buckets' DIV's
    if (secondaryState)
      $("#radix-sort-bucket-labels-collection").show();
    else
      $("#radix-sort-bucket-labels-collection").hide();

    // Exit ==============================
    var exitData = canvasData.exit()
                             .remove();

    // Entry ==============================
    var newData = canvasData.enter()
                            .append("div")
                            .classed({"radix-sort-element": true})
                            .style({
                              "left": FunctionList.radixElement_left,
                              "bottom": FunctionList.radixElement_bottom
                            })
                            .html(FunctionList.radixElement_html);

    // Update ==============================
    canvasData.html(FunctionList.radixElement_html)
              .transition()
              .style({
                "left": FunctionList.radixElement_left,
                "bottom": FunctionList.radixElement_bottom
              });
  };

  var generateRandomNumberArray = function(size, limit) {
    var numArray = new Array();
    for (var i = 0; i < size; i++) {
      numArray.push(generateRandomNumber(1, limit));
    }
    return numArray;
  };

  var generateRandomNumber = function(min, max) { //generates a random integer between min and max (both inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var convertToNumber = function(num) {
    return +num;
  };

  this.createList = function(type) {
    var numArrayMaxListSize = 20;
    var numArrayMaxElementValue = maxElementValue;
    if (this.selectedSortFunction == this.radixSort) {
      numArrayMaxListSize = 15;
      numArrayMaxElementValue = maxRadixSortElementValue;
    }
    else if (this.selectedSortFunction == this.countingSort) {
      numArrayMaxElementValue = maxCountingSortElementValue;
    }

    var numArray = generateRandomNumberArray(generateRandomNumber(10, numArrayMaxListSize), numArrayMaxElementValue);

    switch (type) {
      case 'userdefined':
        numArray = $('#userdefined-input').val().split(",");

        if (numArray.length > numArrayMaxListSize) {
          $("#create-err").html('You can&#39;t have more than {maxSize} elements!'.replace("{maxSize}", numArrayMaxListSize));
          return false;
        }

        for (var i = 0; i < numArray.length; i++) {
          var temp = convertToNumber(numArray[i]);

          if (numArray[i].trim() == "") {
            $("#create-err").html('There seems to be a missing element (a duplicate comma somewhere perhaps?)');
            return false;
          }
          if (isNaN(temp)) {
            $("#create-err").html('There seems to be an invalid element (not a number): {num}.'.replace("{num}", numArray[i]));
            return false;
          }
          if (temp < 1 || temp > numArrayMaxElementValue) {
            $("#create-err").html('Sorry, you&#39;re restricted to values between 1 and {maxValue} inclusive. (Out of range number: {num}.)'.replace("{maxValue}", numArrayMaxElementValue).replace("{num}", numArray[i]));
            return false;
          }

          numArray[i] = convertToNumber(numArray[i]);
        }
        break;
      case 'random':
        break;
      case 'sorted-increasing':
      case 'nearly-sorted-increasing':
        numArray.sort(d3.ascending);
        break;
      case 'sorted-decreasing':
      case 'nearly-sorted-decreasing':
        numArray.sort(d3.descending);
        break;
    }

    if (type.indexOf("nearly") != -1) {
      // To make the list nearly sorted, we take the already sorted list and make swaps
      // such that the list becomes not sorted. The number of such swaps varies from 1 to 2 (customizable).
      // The idea is that the more swaps we make, the less "sorted" the list is.
      //
      // Another limitation is that each swap occurs between elements that are at most 3 positions away.
      while (true) {
        var newNumArray = numArray.slice();

        var numOfSwaps = generateRandomNumber(1, 2);
        for (var i = 0; i < numOfSwaps; i++) {
          var firstSwappingIndex = generateRandomNumber(0, newNumArray.length - 4);
          var secondSwappingIndex = generateRandomNumber(1, 3) + firstSwappingIndex;

          var temp = numArray[firstSwappingIndex];
          newNumArray[firstSwappingIndex] = numArray[secondSwappingIndex];
          newNumArray[secondSwappingIndex] = temp;
        }

        // We compare the numArray with newNumArray, if they're are the same,
        // we try again, else we reassign numArray to newNumArray and break.
        var isEquals = true;
        for (var i = 0; i < numArray.length; i++) {
          if (numArray[i] != newNumArray[i]) {
            isEquals = false;
            break;
          }
        }

        if (!isEquals) {
          numArray = newNumArray;
          break;
        }
      }
    }

    this.loadNumberList(numArray);      
  }

  this.loadNumberList = function(numArray) {
    $("#create-err").html("");

    issPlaying = false;
    currentStep = 0;
    this.currentNumList = numArray;

    //console.log("numArray: " + numArray);

    statelist = [StateHelper.createNewState(numArray)];
    secondaryStatelist = [null]; // the initial secondary state will be an empty state
    drawState(0);
  }

  this.setSelectedSortFunction = function(f) {
    this.selectedSortFunction = f;
    isRadixSort = (this.selectedSortFunction == this.radixSort);
    isCountingSort = (this.selectedSortFunction == this.countingSort);
  }

  this.sort = function(callback) {
    return this.selectedSortFunction(callback);
  }

  this.radixSort = function(callback) {
    var numElements = statelist[0].backlinks.length;
    var state = StateHelper.copyState(statelist[0]);

    populatePseudocode([
      'create 10 buckets (queues) for each digit (0 to 9)',
      'for each digit placing',
      '  for each element in list',
      '    move element into respective bucket',
      '  for each bucket, starting from smallest digit',
      '    while bucket is non-empty',
      '      restore element to list'
    ]);

    secondaryStatelist = [false]; // showBucket flag - if true, shows the DIV's representing the bucketss
    var currentPlacing = 1;
    var targetPlacing = 1;
    var backlinkBuckets = [[], [], [], [], [], [], [], [], [], []];

    var maxValue = d3.max(state.backlinks, function(d) {
      return d.value;
    });
    while (maxValue >= 10) {
      targetPlacing *= 10;
      maxValue = Math.floor(maxValue / 10);
    }

    for (; currentPlacing <= targetPlacing; currentPlacing *= 10) {
      for (var i = 0; i < numElements; i++)
        state.backlinks[i].highlight = currentPlacing;

      StateHelper.updateCopyPush(statelist, state);
      secondaryStatelist.push(true);

      for (var i = 0; i < numElements; i++) {
        var currentDigit = Math.floor(state.backlinks[i].value / currentPlacing) % 10;
        state.backlinks[i].secondaryPositionStatus = currentDigit;
        backlinkBuckets[currentDigit].push(state.backlinks[i]);
        StateHelper.updateCopyPush(statelist, state);
        secondaryStatelist.push(true);
      }

      for (var i = 0, j = 0; i <= 9; ) {
        if (backlinkBuckets[i].length == 0) {
          i++;
          continue;
        }

        state.backlinks[j++] = backlinkBuckets[i].shift();
      }

      for (var i = 0; i < numElements; i++) {
        state.backlinks[i].secondaryPositionStatus = POSITION_USE_PRIMARY;
        StateHelper.updateCopyPush(statelist, state);
        secondaryStatelist.push(true);
      }
    }

    for (var i = 0; i < numElements; i++)
      state.backlinks[i].highlight = HIGHLIGHT_NONE;
    StateHelper.updateCopyPush(statelist, state);
    secondaryStatelist.push(false);

    this.play(callback);
    return true;
  }

  this.countingSort = function(callback) {
    // Note that while we have the maxCountingSortElementValue variable, it isn't really customizable.
    // The code here written is really just for the range 1 to 9.

    var numElements = statelist[0].backlinks.length;
    var state = StateHelper.copyState(statelist[0]);

    populatePseudocode([
      'create key (counting) array',
      'for each element in list',
      '  increase the respective counter by 1',
      'for each counter, starting from smallest key',
      '  while counter is non-zero',
      '    restore element to list',
      '    decrease counter by 1'
    ]);

    var secondaryState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var backlinkBuckets = [[], [], [], [], [], [], [], [], []];

    state.barsCountOffset = maxCountingSortElementValue;

    for (var i = 1; i <= maxCountingSortElementValue; i++) {
      EntryBacklinkHelper.append(state.entries, state.backlinks, i);
      state.backlinks[numElements + i - 1].highlight = HIGHLIGHT_GRAY;
      state.backlinks[numElements + i - 1].secondaryPositionStatus = i * -1 - 5;
    }

    state.lineNo = 1;
    state.status = 'Create the key (counting) array (from 1 to 9).';

    StateHelper.updateCopyPush(statelist, state);
    secondaryStatelist.push(secondaryState.slice()); // copy the array and push it into the secondary statelist

    for (var i = 0; i < numElements; i++) {
      var currentValue = state.backlinks[i].value;

      backlinkBuckets[currentValue-1].push(state.backlinks[i]);

      state.backlinks[i].secondaryPositionStatus = currentValue * -1 - 5;

      secondaryState[currentValue-1]++;

      state.backlinks[currentValue + numElements - 1].highlight = HIGHLIGHT_BLUESHADES[secondaryState[currentValue - 1]];

      state.lineNo = [2, 3];
      state.status = 'Increase the counter with key {curVal} by 1.'.replace("{curVal}", currentValue);

      StateHelper.updateCopyPush(statelist, state);
      secondaryStatelist.push(secondaryState.slice()); // copy the array and push it into the secondary statelist
    }

    for (var i = 0, j = 0; i < maxCountingSortElementValue; ) {
      if (backlinkBuckets[i].length == 0) {
        i++;
        continue;
      }

      state.backlinks[j++] = backlinkBuckets[i].shift();
    }

    for (var i = 0; i < numElements; i++) {
      var currentValue = state.backlinks[i].value;

      state.backlinks[i].secondaryPositionStatus = POSITION_USE_PRIMARY;

      secondaryState[currentValue - 1]--;

      state.backlinks[currentValue + numElements - 1].highlight = HIGHLIGHT_BLUESHADES[secondaryState[currentValue - 1]];

      state.lineNo = [4, 5, 6, 7];
      state.status = 'Restore element {curVal}, and decrease the counter with that key by 1.'.replace("{curVal}", currentValue);

      StateHelper.updateCopyPush(statelist, state);
      secondaryStatelist.push(secondaryState.slice()); //copy the array and push it into the secondary statelist
    }

    state.barsCountOffset = 0;

    for (var i = 1; i <= maxCountingSortElementValue; i++) {
      state.entries.pop();
      state.backlinks.pop();
    }

    state.lineNo = 0;
    state.status = 'List is sorted!';
    StateHelper.updateCopyPush(statelist, state);
    secondaryStatelist.push(null); //copy the array and push it into the secondary statelist

    this.play(callback);
    return true;
  }

  this.randomizedQuickSort = function(callback) {
    quickSortUseRandomizedPivot = true;
    quickSortStart();

    this.play(callback);
    return true;
  }

  this.quickSort = function(callback) {
    quickSortUseRandomizedPivot = false;
    quickSortStart();

    this.play(callback);
    return true;
  }

  var quickSortStart = function() {
    var numElements = statelist[0].backlinks.length;
    var state = StateHelper.copyState(statelist[statelist.length - 1]);

    populatePseudocode([
      'for each (unsorted) partition',
      (quickSortUseRandomizedPivot) ? 'randomly select pivot, swap with first element' : 'set first element as pivot',
      '  storeIndex = pivotIndex + 1',
      '  for i = pivotIndex + 1 to rightmostIndex',
      '    if element[i] < element[pivot]',
      '      swap(i, storeIndex); storeIndex++',
      '  swap(pivot, storeIndex - 1)'
    ]);

    quickSortSplit(state, 0, numElements - 1);

    state.lineNo = 0;
    state.status = 'List is sorted!';

    for (var i = 0; i < numElements; i++)
      state.backlinks[i].highlight = HIGHLIGHT_NONE; //unhighlight everything
    StateHelper.updateCopyPush(statelist, state);
  }

  var quickSortSplit = function(state, startIndex, endIndex) { //startIndex & endIndex inclusive
    state.status = 'Working on partition [{partition}] (index {startIndex} to {endIndex}).'
                  .replace("{partition}", state.backlinks.slice(startIndex, endIndex + 1).map(function(d) {
                     return d.value;
                  }))
                  .replace("{startIndex}", startIndex).replace("{endIndex}", endIndex);
    state.lineNo = 1;

    if (startIndex > endIndex)
      return;

    if (startIndex == endIndex) {
      state.status += ' Since partition size == 1, element inside partition is necessarily at sorted position.';
      state.backlinks[startIndex].highlight = HIGHLIGHT_SORTED;
      StateHelper.updateCopyPush(statelist, state);
      return;
    }

    var middleIndex = quickSortPartition(state, startIndex, endIndex);
    quickSortSplit(state, startIndex, middleIndex - 1);
    quickSortSplit(state, middleIndex + 1, endIndex);
  }

  var quickSortPartition = function(state, startIndex, endIndex) {

    var pivotIndex;
    if (quickSortUseRandomizedPivot) {

      pivotIndex = generateRandomNumber(startIndex, endIndex);

      state.status += ' Randomly selected {pivot} (index {index}) as pivot.'.replace("{pivot}", state.backlinks[pivotIndex].value).replace("{index}", pivotIndex);
      state.lineNo = [1, 2];

      state.backlinks[pivotIndex].highlight = HIGHLIGHT_PIVOT;
      StateHelper.updateCopyPush(statelist, state);

      if (pivotIndex != startIndex) {
        state.status = 'Swap pivot ({pivot}}, index {index}) with first element ({first}, index {firstIndex}). (storeIndex = {storeIndex}.)'.replace("{pivot}", state.backlinks[pivotIndex].value).replace("{index}", pivotIndex)
              .replace("{first}", state.backlinks[startIndex].value).replace("{firstIndex}", startIndex).replace("{storeIndex}", (startIndex + 1));

        state.lineNo = [2, 3];

        EntryBacklinkHelper.swapBacklinks(state.backlinks, pivotIndex, startIndex);
        pivotIndex = startIndex;
        StateHelper.updateCopyPush(statelist, state);
      }
    }
    else {
      pivotIndex = startIndex;

      state.status += ' Selecting {pivot} as pivot. (storeIndex = {storeIndex}.)'.replace("{pivot}", state.backlinks[pivotIndex].value).replace("{storeIndex}", (startIndex + 1));
      state.lineNo = [1, 2, 3];

      state.backlinks[pivotIndex].highlight = HIGHLIGHT_PIVOT;
      StateHelper.updateCopyPush(statelist, state);
    }

    var storeIndex = pivotIndex + 1;
    var pivotValue = state.backlinks[pivotIndex].value;

    for (var i = storeIndex; i <= endIndex; i++) {
      state.status = 'Checking if {val} < {pivot} (pivot).'.replace("{val}", state.backlinks[i].value).replace("{pivot}", pivotValue);
      state.lineNo = [4, 5];

      state.backlinks[i].highlight = HIGHLIGHT_SPECIAL;
      StateHelper.updateCopyPush(statelist, state);
      if (state.backlinks[i].value < pivotValue) {
        state.status = '{val} &lt; {pivot} (pivot) is true. Swapping index {idx} (value = {val}) with element at storeIndex {storeIdx} (value = {storeVal}). (Value of storeIndex = {newStoreIdx}).'.replace("{val}", state.backlinks[i].value).replace("{pivot}", pivotValue)
              .replace("{idx}", i).replace("{storeIdx}", storeIndex).replace("{storeVal}", state.backlinks[storeIndex].value).replace("newStoreIdx", (storeIndex + 1));
        state.lineNo = [4, 6];

        if (i != storeIndex) {
          EntryBacklinkHelper.swapBacklinks(state.backlinks, storeIndex, i);
          StateHelper.updateCopyPush(statelist, state);
        }

        state.backlinks[storeIndex].highlight = HIGHLIGHT_LEFT;
        storeIndex++;
      }
      else {
        state.backlinks[i].highlight = HIGHLIGHT_RIGHT;
      }
    }
    state.status = 'Iteration complete.';
    state.lineNo = 4;
    StateHelper.updateCopyPush(statelist, state);
    if (storeIndex - 1 != pivotIndex) {
      state.status = 'Swapping pivot (index = {pivotIdx}, value = {pivot}) with element at storeIndex - 1 (index = {newIdx}, value = {newVal}).'.replace("{pivotIdx}", pivotIndex).replace("{pivot}", pivotValue)
            .replace("{newIdx}", (storeIndex - 1)).replace("{newVal}", state.backlinks[storeIndex - 1].value);
      state.lineNo = 7;
      EntryBacklinkHelper.swapBacklinks(state.backlinks, storeIndex - 1, pivotIndex);
      StateHelper.updateCopyPush(statelist, state);
    }

    state.status = 'Pivot is now at its sorted position.';
    state.lineNo = 7;

    for (var i = startIndex; i <= endIndex; i++)
      state.backlinks[i].highlight = HIGHLIGHT_NONE; //unhighlight everything
    state.backlinks[storeIndex - 1].highlight = HIGHLIGHT_SORTED;
    StateHelper.updateCopyPush(statelist, state);

    return storeIndex - 1;
  }

  this.mergeSort = function(callback) {
    var numElements = statelist[0].backlinks.length;
    var state = StateHelper.copyState(statelist[0]);

    populatePseudocode([
      'split each element into partitions of size 1',
      'recursively merge adjacent partitions',
      '  for i = leftPartIdx to rightPartIdx',
      '    if leftPartHeadValue <= rightPartHeadValue',
      '      copy leftPartHeadValue',
      '    else: copy rightPartHeadValue' + ((this.computeInversionIndex) ? '; Increase InvIdx' : ""),
      'copy elements back to original array'
    ]);

    mergeSortInversionIndexCounter = 0;

    for (var i = 0; i < numElements; i++) {
      state.backlinks[i].highlight = HIGHLIGHT_RAINBOW[i];
    }

    state.status = 'We split the array into partitions of 1 (each partition takes on a distinct color).';
    status.lineNo = 1;
    StateHelper.updateCopyPush(statelist, state);

    this.mergeSortSplitMerge(state, 0, numElements);

    for (var i = 0; i < numElements; i++)
      state.backlinks[i].highlight = HIGHLIGHT_NONE; //unhighlight everything

    state.status = 'List is sorted!';
    if (this.computeInversionIndex) {
      state.status += ' (Inversion Index = {idx}.)'.replace("{idx}", mergeSortInversionIndexCounter);
    }

    state.lineNo = 0;
    StateHelper.updateCopyPush(statelist, state);

    this.play(callback);
    return true;
  }

  this.mergeSortSplitMerge = function(state, startIndex, endIndex) { //startIndex inclusive, endIndex exclusive
    if (endIndex - startIndex <= 1)
      return;

    var middleIndex = Math.ceil((startIndex + endIndex) / 2);
    this.mergeSortSplitMerge(state, startIndex, middleIndex);
    this.mergeSortSplitMerge(state, middleIndex, endIndex);
    this.mergeSortMerge(state, startIndex, middleIndex, endIndex)

    // Copy array back
    state.status = 'We copy the elements from the new array back into the original array.';
    state.lineNo = 7;

    var duplicateBacklinks = new Array();
    for (var i = startIndex; i < endIndex; i++) {
      var newPosition = state.backlinks[i].secondaryPositionStatus;
      duplicateBacklinks[newPosition] = state.backlinks[i];
    }

    for (var i = startIndex; i < endIndex; i++) {
      state.backlinks[i] = duplicateBacklinks[i];
    }

    for (var i = startIndex; i < endIndex; i++) {
      state.backlinks[i].secondaryPositionStatus = POSITION_USE_PRIMARY;
      StateHelper.updateCopyPush(statelist, state);
    }
  }

  this.mergeSortMerge = function(state, startIndex, middleIndex, endIndex) {
    var leftIndex = startIndex;
    var rightIndex = middleIndex;

    var newHighlightColor = state.backlinks[startIndex].highlight;

    state.status = 'We now merge partitions [{partition1}] (index {startIdx1} to {endIdx1}) and [{partition2}] (index {startIdx2} to {endIdx2}).'
        .replace('{partition1}', state.backlinks.slice(startIndex, middleIndex).map(function(d) {
          return d.value;
        }))
        .replace("{startIdx1}", startIndex).replace("{endIdx1}", (middleIndex - 1))
        .replace("{partition2}", state.backlinks.slice(middleIndex, endIndex).map(function(d) {
          return d.value;
        }))
        .replace("{startIdx2}", middleIndex).replace("{endIdx2}", (endIndex - 1));
    state.lineNo = 2;

    state.backlinks[leftIndex].highlight = makePaler(state.backlinks[leftIndex].highlight);
    state.backlinks[rightIndex].highlight = makePaler(state.backlinks[rightIndex].highlight);
    StateHelper.updateCopyPush(statelist, state);

    for (var i = startIndex; i < endIndex; i++) {
      // Note here we don't actually copy the elements into a new array, like in a usual mergesort.
      // This is left instead to the mergeSortSplitMerge to handle as it's easier there.
      // (We use the useSecondaryPostion property to overcome this lack-of-copying.)
      if (leftIndex < middleIndex && (rightIndex >= endIndex || state.backlinks[leftIndex].value <= state.backlinks[rightIndex].value)) {
        state.backlinks[leftIndex].highlight = newHighlightColor;
        state.backlinks[leftIndex].secondaryPositionStatus = i;

        if (rightIndex < endIndex) {
          state.status = 'Since {leftPart} (left partition) <= {rightPart} (right partition), we copy {leftPart} into new array.'
            .replace("{leftPart}", state.backlinks[leftIndex].value).replace("{rightPart}", state.backlinks[rightIndex].value);
        }
        else {
          state.status = 'Since right partition is empty, we copy {leftPart} (left partition) into new array.'.replace("{leftPart}", state.backlinks[leftIndex].value);
        }
        state.lineNo = [3, 4, 5];

        leftIndex++;
        if (leftIndex != middleIndex)
          state.backlinks[leftIndex].highlight = makePaler(state.backlinks[leftIndex].highlight);

        StateHelper.updateCopyPush(statelist, state);
      }
      else {
        state.backlinks[rightIndex].highlight = newHighlightColor;
        state.backlinks[rightIndex].secondaryPositionStatus = i;

        if (leftIndex < middleIndex) {
          state.status = 'Since {leftPart} (left partition) > {rightPart} (right partition), we copy {rightPart} into new array.'
            .replace("{leftPart}", state.backlinks[leftIndex].value).replace("{rightPart}", state.backlinks[rightIndex].value);
        }
        else {
          state.status = 'Since left partition is empty, we copy {rightPart} (right partition) into new array.'.replace("{rightPart}", state.backlinks[rightIndex].value);
        }

        if (this.computeInversionIndex) {
          mergeSortInversionIndexCounter += middleIndex - leftIndex;
          state.status += '(We add size_of_left_partition (= {sizeofleft}) to <b>InvIdx</b> ({inversionidxcounter}).)'
            .replace("{sizeofleft}", (middleIndex - leftIndex)).replace("{inversionidxcounter}", mergeSortInversionIndexCounter);
        }
        else {
          state.status += 'wierd';
        }
        state.lineNo = [3, 6];

        rightIndex++;
        if (rightIndex != endIndex)
          state.backlinks[rightIndex].highlight = makePaler(state.backlinks[rightIndex].highlight);

        StateHelper.updateCopyPush(statelist, state);
      }
    }
  }

  this.insertionSort = function(callback) {
    var numElements = statelist[0].backlinks.length;
    var state = StateHelper.copyState(statelist[0]);

    populatePseudocode([
      'mark first element as sorted',
      'for each unsorted element X',
      '  &#39;extract&#39; the element X',
      '  for j = lastSortedIndex down to 0',
      '    if current element j &gt; X',
      '      move sorted element to the right by 1',
      '    break loop and insert X here'
    ]);

    // First element always sorted
    state.lineNo = 1;
    // Mark the first element ({firstVal}) as sorted.
    state.status = 'Mark the first element ({firstVal}) as sorted.'.replace("{firstVal}", state.backlinks[0].value);
    state.backlinks[0].highlight = HIGHLIGHT_SORTED;
    StateHelper.updateCopyPush(statelist, state);

    for (var i = 1; i < numElements; i++) {
      // Highlight first unsorted element
      state.lineNo = [2, 3];
      // Extract the first unsorted element ({val}).
      state.status = 'Extract the first unsorted element ({val}).'.replace("{val}", state.backlinks[i].value);
      state.backlinks[i].highlight = HIGHLIGHT_SPECIAL;
      state.backlinks[i].secondaryPositionStatus = POSITION_USE_SECONDARY_IN_DEFAULT_POSITION;
      StateHelper.updateCopyPush(statelist, state);

      for (var j = i-1; j >= 0; j--) {
        state.lineNo = 4;
        // Figure where to insert extracted element.
        // Comparing with sorted element {val}.
        state.status = 'Figure where to insert extracted element; comparing with sorted element {val}.'.replace("{val}", state.backlinks[j].value);;
        state.backlinks[j].highlight = HIGHLIGHT_STANDARD;
        StateHelper.updateCopyPush(statelist, state);

        if (state.backlinks[j].value > state.backlinks[j+1].value) {
          state.lineNo = [5, 6];
          // {val1} > {val2} is true.
          // Hence move current sorted element ({val1}) to the right by 1.
          state.status = '{val1} > {val2} is true, hence move current sorted element ({val1}) to the right by 1.'.replace("{val1}", state.backlinks[j].value).replace("{val2}", state.backlinks[j+1].value);
          EntryBacklinkHelper.swapBacklinks(state.backlinks, j, j+1);
          StateHelper.updateCopyPush(statelist, state);
          state.backlinks[j+1].highlight = HIGHLIGHT_SORTED;
        }
        else {
          state.lineNo = 7;
          // {val1} > {val2} is false.
          // Insert extracted element at current position.
          state.status = '{val1} > {val2} is false, insert element at current position.'.replace("{val1}", state.backlinks[j].value).replace("{val2}", state.backlinks[j+1].value);
          state.backlinks[j].highlight = HIGHLIGHT_SORTED;
          state.backlinks[j+1].secondaryPositionStatus = POSITION_USE_PRIMARY;
          state.backlinks[j+1].highlight = HIGHLIGHT_SORTED;
          StateHelper.updateCopyPush(statelist, state);
          break;
        }
      }

      if (state.backlinks[0].secondaryPositionStatus == POSITION_USE_SECONDARY_IN_DEFAULT_POSITION) {
        state.lineNo = 4;
        // At beginning of array (nothing to compare).
        // Hence insert extracted element at current position.
        state.status = 'At beginning of array (nothing to compare), hence insert element at current position.';
        state.backlinks[0].secondaryPositionStatus = POSITION_USE_PRIMARY;
        state.backlinks[0].highlight = HIGHLIGHT_SORTED;
        StateHelper.updateCopyPush(statelist, state);
      }
    }

    for (var i = 0; i < numElements; i++)
      state.backlinks[i].highlight = HIGHLIGHT_NONE; //unhighlight everything
    state.lineNo = 0;
    // The array/list is now sorted.
    state.status = 'List is sorted!';
    StateHelper.updateCopyPush(statelist, state);

    this.play(callback);
    return true;
  }

  this.selectionSort = function(callback) {
    var numElements = statelist[0].backlinks.length;
    var state = StateHelper.copyState(statelist[0]);

    populatePseudocode([
      'repeat (numOfElements - 1) times',
      '  set the first unsorted element as the minimum',
      '  for each of the unsorted elements',
      '    if element < currentMinimum',
      '      set element as new minimum',
      '  swap minimum with first unsorted position'
    ]);

    for (var i = 0; i < numElements-1; i++) {
      var minPosition = i;

      // Iteration {iteration}: Set {val} as the current minimum.
      // Then iterate through the rest to find the true minimum.
      state.status = 'Iteration {iteration}: Set {val} as the current minimum, then iterate through the remaining unsorted elements to find the true minimum.'.replace("{iteration}", (i+1)).replace("{val}", state.backlinks[i].value);
      state.lineNo = [1, 2, 3];
      state.backlinks[minPosition].highlight = HIGHLIGHT_SPECIAL;

      StateHelper.updateCopyPush(statelist, state);

      for (var j = i+1; j < numElements; j++) {
        // Check if {val} is smaller than the current minimum ({minVal}).
        state.status = 'Check if {val} is smaller than the current minimum ({minVal}).'.replace("{val}", state.backlinks[j].value).replace("{minVal}", state.backlinks[minPosition].value);
        state.lineNo = 4;
        state.backlinks[j].highlight = HIGHLIGHT_STANDARD;
        StateHelper.updateCopyPush(statelist, state);

        state.backlinks[j].highlight = HIGHLIGHT_NONE;

        if (state.backlinks[j].value < state.backlinks[minPosition].value) {
          state.status = 'Set {val} as the new minimum.'.replace("{val}", state.backlinks[j].value);
          state.lineNo = 5;
          state.backlinks[minPosition].highlight = HIGHLIGHT_NONE;
          state.backlinks[j].highlight = HIGHLIGHT_SPECIAL;

          minPosition = j;
          StateHelper.updateCopyPush(statelist, state);
        }
      }

      if (minPosition != i) { // Highlight the first-most unswapped position, if it isn't the minimum
        // Set {val} as the new minimum.
        state.status = 'Swap the minimum ({minVal}) with the first unsorted element ({element}).'.replace("{minVal}", state.backlinks[minPosition].value).replace("{element}", state.backlinks[i].value);
        state.lineNo = 6;
        state.backlinks[i].highlight = HIGHLIGHT_SPECIAL;
        StateHelper.updateCopyPush(statelist, state);

        EntryBacklinkHelper.swapBacklinks(state.backlinks, minPosition, i);
        StateHelper.updateCopyPush(statelist, state);
      }
      else {
        // As the minimum is the first unsorted element, no swap is necessary.
        state.status = 'As the minimum is the first unsorted element, no swap is necessary.';
        state.lineNo = 6;
        StateHelper.updateCopyPush(statelist, state);
      }

      // {val} is now considered sorted.
      state.status = '{val} is now considered sorted.'.replace("{val}", state.backlinks[i].value);
      state.backlinks[minPosition].highlight = HIGHLIGHT_NONE;
      state.backlinks[i].highlight = HIGHLIGHT_SORTED;
      StateHelper.updateCopyPush(statelist, state);
    }

    for (var i = 0; i < numElements; i++)
      state.backlinks[i].highlight = HIGHLIGHT_NONE; // un-highlight everything
    // The array/list is now sorted.
    // (After all iterations, the last element will naturally be sorted.)
    state.status = 'List is sorted!' + '<br>' + '(After all iterations, the last element will naturally be sorted.)';
    status.lineNo = 0;
    StateHelper.updateCopyPush(statelist, state);

    this.play(callback);
    return true;
  }

  this.bubbleSort = function(callback) {
    var numElements = statelist[0].backlinks.length;
    var state = StateHelper.copyState(statelist[0]);
    var swapCounter = 0;

    populatePseudocode([
      'do',
      '  <b>swapped </b>= false',
      '  for i = 1 to indexOfLastUnsortedElement-1',
      '    if leftElement > rightElement',
      '      swap(leftElement, rightElement)',
      '      <b>swapped </b>= true' + ((this.computeInversionIndex) ? '; <b>swapCounter</b>++' : ""),
      'while <b>swapped</b>'
    ]);

    var swapped;
    var indexOfLastUnsortedElement = numElements;
    do {
      swapped = false;

      // Set the swapped flag to false.
      // Then iterate from 1 to {endIdx} inclusive.
      state.status = 'Set the <b>swapped </b>flag to false.<div>Then iterate from index 1 to {endIdx} inclusive.</div>'.replace("{endIdx}", indexOfLastUnsortedElement-1);
      state.lineNo = [2, 3];
      StateHelper.updateCopyPush(statelist, state);

      for (var i = 1; i < indexOfLastUnsortedElement; i++) {
        state.backlinks[i-1].highlight = HIGHLIGHT_STANDARD;
        state.backlinks[i].highlight = HIGHLIGHT_STANDARD;

        // Checking if {val1} > {val2} and swap them if that is true.
        // The current value of swapped = {swapped}.
        state.status = '<div>Checking if {val1} &gt; {val2} and swap them if that is true.</div>The current value of <b>swapped </b>= {swapped}.'.replace("{val1}", state.backlinks[i-1].value).replace("{val2}", state.backlinks[i].value).replace("{swapped}", swapped);
        state.lineNo = 4;
        StateHelper.updateCopyPush(statelist, state);

        if (state.backlinks[i-1].value > state.backlinks[i].value) {
          swapped = true;

          // Swapping the positions of {val1} and {val2}.
          // Set swapped = true.
          state.status = 'Swapping the positions of {val1} and {val2}.<div>Set <b>swapped </b>= true.</div>'.replace("{val1}", state.backlinks[i-1].value).replace("{val2}", state.backlinks[i].value);
          if (this.computeInversionIndex) {
            swapCounter++;
            // For inversion index computation: Add 1 to swapCounter.
            // The current value of swapCounter = {swapCounter}.
            state.status += ' For inversion index: Add 1 to <b>swapCounter</b>, now = {swapCounter}.'.replace("{swapCounter}", swapCounter);
          }

          state.lineNo = [5, 6];

          EntryBacklinkHelper.swapBacklinks(state.backlinks, i, i-1);
          StateHelper.updateCopyPush(statelist, state);
        }

        state.backlinks[i-1].highlight = HIGHLIGHT_NONE;
        state.backlinks[i].highlight = HIGHLIGHT_NONE;
      }

      indexOfLastUnsortedElement--;
      state.backlinks[indexOfLastUnsortedElement].highlight = HIGHLIGHT_SORTED;
      if (swapped == false)
        // No swap is done in this pass.
        // We can terminate Bubble Sort now.
        state.status = 'No swap is done in this pass.<div>We can terminate Bubble Sort now</div>';
      else
        // Mark last unsorted element as sorted now.
        // As at least one swap is done in this pass, we continue.
        state.status = '<div>Mark this element as sorted now.</div><div>As at least one swap is done in this pass, we continue.</div>';

      state.lineNo = 7;
      StateHelper.updateCopyPush(statelist, state);
    }
    while (swapped);

    for (var i = 0; i < numElements; i++)
      state.backlinks[i].highlight = HIGHLIGHT_NONE; //un-highlight everything

    // The array/list is now sorted.
    state.status = 'List is sorted!';
    if (this.computeInversionIndex)
      // Inversion Index = {swapCounter}.
      state.status += ' Inversion Index = {swapCounter}.'.replace("swapCounter", swapCounter);

    state.lineNo = 0;
    StateHelper.updateCopyPush(statelist, state);

    this.play(callback);
    return true;
  }

  this.clearPseudocode = function() { populatePseudocode([]); }

  var populatePseudocode = function(code) {
    var i = 1;
    for (; i <= 7 && i <= code.length; i++) {
      $("#code" + i).html(
        code[i - 1].replace(
        /^\s+/,
        function(m) { return m.replace(/\s/g, "&nbsp;"); }
        )
      );
    }
    for (; i <= 7; i++) {
      $("#code" + i).html("");
    }
  }

  //animation functions
  var drawCurrentState = function() {
    $('#progress-bar').slider("value", currentStep);
    drawState(currentStep);
    if (currentStep == (statelist.length-1)) {
      pause(); //in html file
      $('#play img').attr('src', 'https://visualgo.net/img/replay.png').attr('alt', 'replay').attr('title', 'replay');
    }
    else
      $('#play img').attr('src', 'https://visualgo.net/img/play.png').attr('alt', 'play').attr('title', 'play');
  }

  this.getAnimationDuration = function() { return transitionTime; }

  this.setAnimationDuration = function(x) {
    transitionTime = x;
    if (issPlaying) {
      clearInterval(animInterval);
      animInterval = setInterval(function() {
        drawCurrentState();
        if (currentStep < (statelist.length-1))
          currentStep++;
        else
          clearInterval(animInterval);
      }, transitionTime);
    }
  }

  this.getCurrentIteration = function() { return currentStep; }

  this.getTotalIteration = function() { return statelist.length; }

  this.forceNext = function() {
    if ((currentStep + 1) < statelist.length)
      currentStep++;
    drawCurrentState();
  }

  this.forcePrevious = function() {
    if ((currentStep-1) >= 0)
      currentStep--;
    drawCurrentState();
  }

  this.jumpToIteration = function(n) {
    currentStep = n;
    drawCurrentState();
  }

  this.play = function(callback) {
    issPlaying = true;
    drawCurrentState();
    animInterval = setInterval(function() {
      drawCurrentState();
      if (currentStep < (statelist.length-1))
        currentStep++;
      else {
        clearInterval(animInterval);
        if (typeof callback == 'function') callback();
      }
    }, transitionTime);
  }

  this.pause = function() {
    issPlaying = false;
    clearInterval(animInterval);
  }

  this.replay = function() {
    issPlaying = true;
    currentStep = 0;
    drawCurrentState();
    animInterval = setInterval(function() {
      drawCurrentState();
      if (currentStep < (statelist.length-1))
        currentStep++;
      else
        clearInterval(animInterval);
    }, transitionTime);
  }

  this.stop = function() {
    issPlaying = false;
    statelist = [statelist[0]]; //clear statelist to original state, instead of new Array();
    secondaryStatelist = [null];
    currentStep = 0;
    drawState(0);
  }
}

// sorting action
var actionsWidth = 150;
var statusCodetraceWidth = 420;

var isCreateOpen = false;
var isInsertOpen = false;
var isRemoveOpen = false;
var isSortOpen = false;

function openCreate() {
  if (!isCreateOpen) {
    $('.create').fadeIn('fast');
    isCreateOpen = true;
  }
}

function closeCreate() {
  if (isCreateOpen) {
    $('.create').fadeOut('fast');
    $('#create-err').html("");
    isCreateOpen = false;
  }
}

function openInsert() {
  if (!isInsertOpen) {
    $('.insert').fadeIn('fast');
    isInsertOpen = true;
  }
}

function closeInsert() {
  if (isInsertOpen) {
    $('.insert').fadeOut('fast');
    $('#insert-err').html("");
    isInsertOpen = false;
  }
}

function openRemove() {
  if (!isRemoveOpen) {
    $('.remove').fadeIn('fast');
    isRemoveOpen = true;
  }
}

function closeRemove() {
  if (isRemoveOpen) {
    $('.remove').fadeOut('fast');
    $('#remove-err').html("");
    isRemoveOpen = false;
  }
}

function openSort() {
  if (!isSortOpen) {
    $('.sort').fadeIn('fast');
    isSortOpen = true;
  }
}

function closeSort() {
  if (isSortOpen) {
    $('.sort').fadeOut('fast');
    $('#sort-err').html("");
    isSortOpen = false;
  }
}

function hideEntireActionsPanel() {
  closeCreate();
  closeInsert();
  closeRemove();
  closeSort();
  hideActionsPanel();
}



// local
$(function() {
  AbbreviateTitle();
  hideAllSubmenus();
  var eight_modes = ["Bubble", "Selection", "Insertion", "Merge", "Quick", "RandomizedQuick", "Counting", "Radix"];
  $('#title-'+eight_modes[Math.floor(Math.random()*8)]).click(); // randomly open one of the eight sorting algorithm mode every time
  $('#play').hide();

  d3.selectAll("#radix-sort-bucket-labels-collection span")
    .style({"left": function(d, i) {
                  return 17.5 + i * 65 + "px";
          }});
  var sortMode = getQueryVariable("mode");
  if (sortMode.length > 0) {
     $('#title-' + sortMode).click();
  }
  var createArray = getQueryVariable("create");
  if (createArray.length > 0) {
    $('#userdefined-input').val(createArray);
    createList("userdefined");
  }

  $('#create').click(function() {
    closeInsert();
    closeRemove();
    closeSort();
    openCreate();
  });

  $('#insert').click(function() {
    closeCreate();
    closeRemove();
    closeSort();
    openInsert();
  });

  $('#remove').click(function() {
    closeCreate();
    closeInsert();
    closeSort();
    openRemove();
  });

  $('#sort').click(function() {
    closeCreate();
    closeInsert();
    closeRemove();
    openSort();
  });
});

//this viz-specific code
var gw = new Sorting();

const DEFAULT_DATA       = "3,44,38,5,47,15,36,26,27,2,46,4,19,50,48";
const DEFAULT_COUNT_DATA = "2, 3, 8, 7, 1, 2, 2, 2, 7, 3, 9, 8, 2, 1, 4, 2, 4, 6, 9, 2";
const DEFAULT_RADIX_DATA = "3221, 1, 10, 9680, 577, 9420, 7, 5622, 4793, 2030, 3138, 82, 2599, 743, 4127";

// title changing
function AbbreviateTitle() {
  $('#title-Bubble').text("BUB").attr('title', 'Bubble Sort');
  $('#title-Selection').text("SEL").attr('title', 'Selection Sort');
  $('#title-Insertion').text("INS").attr('title', 'Insertion Sort');
  $('#title-Merge').text("MER").attr('title', 'Merge Sort');
  $('#title-Quick').text("QUI").attr('title', 'Quick Sort');
  $('#title-RandomizedQuick').text("R-Q").attr('title', 'Random Quick Sort');
  $('#title-Counting').text("COU").attr('title', 'Counting Sort');
  $('#title-Radix').text("RAD").attr('title', 'Radix Sort');
}
$('#title-Bubble').click(function() {
  showStandardCanvas();
  $("#sort-bubble-merge-inversion").css("display", "");
  $('#current-action p').html('Bubble Sort');
  changeSortType(gw.bubbleSort);
  AbbreviateTitle();
  $('#title-Bubble').text('Bubble Sort');
});
$('#title-Selection').click(function() {
  showStandardCanvas();
  hideAllSortingOptions();
  $('#current-action p').html('Selection Sort');
  changeSortType(gw.selectionSort);
  AbbreviateTitle();
  $('#title-Selection').text('Selection Sort');
});
$('#title-Insertion').click(function() {
  showStandardCanvas();
  hideAllSortingOptions();
  $('#current-action p').html('Insertion Sort');
  changeSortType(gw.insertionSort);
  AbbreviateTitle();
  $('#title-Insertion').text('Insertion Sort');
});
$('#title-Merge').click(function() {
  showStandardCanvas();
  hideAllSortingOptions();
  $("#sort-bubble-merge-inversion").css("display", "");
  $('#current-action p').html('Merge Sort');
  AbbreviateTitle();
  changeSortType(gw.mergeSort);
  $('#title-Merge').text('Merge Sort');
});
$('#title-Quick').click(function() {
  showStandardCanvas();
  hideAllSortingOptions();
  $('#current-action p').html('Quick Sort');
  changeSortType(gw.quickSort);
  AbbreviateTitle();
  $('#title-Quick').text('Quick Sort');
});
$('#title-RandomizedQuick').click(function() {
  showStandardCanvas();
  hideAllSortingOptions();
  $('#current-action p').html('Random Quick Sort');
  changeSortType(gw.randomizedQuickSort);
  AbbreviateTitle();
  $('#title-RandomizedQuick').text('Random Quick Sort');
});
$('#title-Counting').click(function() {
  showStandardCanvas();
  $("#viz-counting-sort-secondary-canvas").show();
  hideAllSortingOptions();
  $('#current-action p').html('Counting Sort');
  changeSortType(gw.countingSort, DEFAULT_COUNT_DATA);
  AbbreviateTitle();
  $('#title-Counting').text('Counting Sort');
});
$('#title-Radix').click(function() {
  hideAllCanvases();
  $("#viz-radix-sort-canvas").show();
  hideAllSortingOptions();
  $('#current-action p').html('Radix Sort');
  changeSortType(gw.radixSort, DEFAULT_RADIX_DATA);
  AbbreviateTitle();
  $('#title-Radix').text('Radix Sort');
});

function changeSortType(newSortingFunction, customNumberList) {
  if (!customNumberList)
    $('#userdefined-input').val(DEFAULT_DATA);
  else
    $('#userdefined-input').val(customNumberList);
  createList('userdefined');

  if (isPlaying) stop();
  showActionsPanel();
  hideStatusPanel();
  hideCodetracePanel();
  gw.clearPseudocode();
  gw.setSelectedSortFunction(newSortingFunction);
}

function createList(type) {
  if (isPlaying) stop();
  setTimeout(function() {
    if (gw.createList(type)) {
      $('#progress-bar').slider("option", "max", 0);
      closeCreate();
      isPlaying = false;
    }
  }, 500);
}

function sort(callback) {
  gw.computeInversionIndex = $('#sort-bubble-merge-inversion-checkbox').prop('checked');
  if (isPlaying) stop();
  setTimeout(function() {
    if (gw.sort(callback)) {
      $('#current-action').show();
      $('#progress-bar').slider("option", "max", gw.getTotalIteration()-1);
      triggerRightPanels();
      isPlaying = true;
    }
  }, 500);
}

// submenu stuff
var lastSubmenuShown = null;

function triggerSubmenu(which) {
  hideAllSubmenus();
  if (lastSubmenuShown == which) {
    lastSubmenuShown = null;
    return;
  }

  lastSubmenuShown = which;

  $(".create").css("bottom", "60px");
  if (which == "sorted") {
    $("#create-sorted-increasing").show();
    $("#create-sorted-decreasing").show();
  }
  else if (which == "nearly-sorted") {
    $("#create-nearly-sorted-increasing").show();
    $("#create-nearly-sorted-decreasing").show();
  }
}

function hideAllSubmenus() {
  $(".create").css("bottom", "92px");
  $("#create-sorted-increasing").hide();
  $("#create-sorted-decreasing").hide();
  $("#create-nearly-sorted-increasing").hide();
  $("#create-nearly-sorted-decreasing").hide();
}

// sort options
function hideAllSortingOptions() {
  $("#sort-bubble-merge-inversion").css("display", "none");
}

// canvas
function hideAllCanvases() {
  $("#viz-canvas").hide();
  $("#viz-counting-sort-secondary-canvas").hide();
  $("#viz-radix-sort-canvas").hide();
}

function showStandardCanvas() {
  $("#viz-canvas").show();
  $("#viz-counting-sort-secondary-canvas").hide();
  $("#viz-radix-sort-canvas").hide();
}

var exploreModeData = [];

// This function will be called before entering E-Lecture Mode
function ENTER_LECTURE_MODE() {
  exploreModeData = gw.currentNumList;
}

// This function will be called before returning to Explore Mode
function ENTER_EXPLORE_MODE() {
  gw.loadNumberList(exploreModeData);
}

// Lecture action functions
function SORT(mode) {
  hideSlide(function() {
    sort(showSlide);
  });
}
function CUSTOM_ACTION(action, data, mode) {}
</script>
</body>
</html>
