import { WatcherForParallelTabs } from './classes/WatcherForParallelTabs.js';
import { WordsModelViewController } from './classes/WordsModelViewController.js';
import { createLevelsArray } from './utils/createLevelsArray.js';



createLevelsArray().then(levels => new WordsModelViewController(levels));
const watcher = new WatcherForParallelTabs();


