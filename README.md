# Bitsy Games Data Set
This data set combines around 447 [Bitsy](http://ledoux.io/bitsy/editor.html) games that was collected By [Mark Wonnacott](https://candle.itch.io/) in a numpy easy to parse format.

# Different Types of files
- [animation.npz](https://github.com/amidos2006/BitsyDo/blob/master/DataSet/animation.npz): contains all game sprites, items, tiles, and avatar frames.
- [text.npz](https://github.com/amidos2006/BitsyDo/blob/master/DataSet/text.npz): contains all the game text: game names, sprite dialogues, item dialogues, and game endings.
- [images.npz](https://github.com/amidos2006/BitsyDo/blob/master/DataSet/images.npz): contains all the game graphics: avatars, sprites, solid tiles, background tiles, and items.
- [palettes.npz](https://github.com/amidos2006/BitsyDo/blob/master/DataSet/palettes.npz): contains all the palletes used in all the included games.
- [rooms.npz](https://github.com/amidos2006/BitsyDo/blob/master/DataSet/rooms.npz): contains all the game rooms in a generic format that is composed of 3 layers: solid and background tile layer; sprites and items tile layer; and exit and endings tile layer. This data is divided into two types: starting rooms and other rooms.
- [full.npz](https://github.com/amidos2006/BitsyDo/blob/master/DataSet/full.npz): contains all the game files as pure text files. It is not a big data set for now (447 games) so be careful not to overfit the data.

# How to use the Data Set
Loading the data set is super simple using numpy in Python. The following code will load any file in its format
```python
import numpy as np

data = np.load(file_name)
```
Each file returns python object that you need to access using the correct keys to retrive the numpy arrays of the data.
### animation.npz
The animation object contains two numpy array of the same length (15414 entries):
- frame1: the first frame of the animation
- frame2: the second frame of the animation
Each entry from either "frame1" or "frame2" is an 8x8 binary image.

Here are some examples of the animations:
<table align="center">
    <tr>
        <td><img width="100" src="graphics/animation_0.png"/></td>
        <td><img width="100" src="graphics/animation_1.png"/></td>
        <td><img width="100" src="graphics/animation_2.png"/></td>
        <td><img width="100" src="graphics/animation_3.png"/></td>
        <td><img width="100" src="graphics/animation_4.png"/></td>
    </tr>
</table>

### text.npz
The text object contains

### images.npz

### palettes.npz

### rooms.npz

### full.npz

# BitsyDO Project

# Other Bitsy cool Projects and Games
- [Drowsy](https://github.com/Pyrofoux/Drowsy) by [Younès Rabii](https://twitter.com/Pyrofoux): [https://pyrofoux.itch.io/drowsy](https://pyrofoux.itch.io/drowsy)
- [World of Bitsy](https://candle.itch.io/world-of-bitsy) by [Mark Wonnacott](https://candle.itch.io/): [https://candle.itch.io/world-of-bitsy](https://candle.itch.io/world-of-bitsy)
- [Bitsy Mystery Dungeon](https://ducklingsmith.itch.io/bitsy-mystery-dungeon) by Many Authors: [https://ducklingsmith.itch.io/bitsy-mystery-dungeon](https://ducklingsmith.itch.io/bitsy-mystery-dungeon)

# Copyrights
The original game files can be found at [link](https://github.com/Ragzouken/bitsy-archive). Thanks for [Mark Wonnacott](https://candle.itch.io/) for collecting the Bitsy games for his amazing project [Bitsy Boutique](https://candle.itch.io/bitsy-boutique). These data set is only intended for research purposes so please don't use for any other purposes without the designers permissions.
