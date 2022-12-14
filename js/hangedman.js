var secretWord;
var wordOnTheScreen = "";
var numberOfWrongGuesses = 0;

function start()
{
    secretWord = document.getElementById("secretWord").value;
    if (secretWord.includes(" ") || secretWord.value == "")
    {
        console.log('has space');
    }
    else
    {
        initialize();
    }

}

function initialize()
{
    var form1 = document.getElementById("form1");
    form1.style = "display: none;";
    var form2 = document.getElementById("form2");
    form2.style = "display: inline;";
    for (i = 0; i < secretWord.length; i++)
    {
        wordOnTheScreen += "_ ";
    }
    document.getElementById("word").innerHTML = wordOnTheScreen;
}

function check()
{
    let correctLetter = 0;
    var letter = document.getElementById("letter").value;
    if (letter.length == 1)
    {
        for(j = 0; j < secretWord.length; j++)
        {
            if (secretWord[j] == letter)
            {
                wordOnTheScreen = wordOnTheScreen.substring(0, 2*j) + letter + wordOnTheScreen.substring(2*j+1);; 
                correctLetter = 1;
            }
        }
        if (correctLetter == 0)
        {
            var imageTitle = document.getElementById("image").getAttribute("src");
            var imageNumber = imageTitle[25];
            parseInt(imageNumber++);
            imageTitle = './assets/hangedAssets/img' + imageNumber + '.png';
            document.getElementById("image").src = imageTitle;
            numberOfWrongGuesses++;
        }
    }
    console.log(wordOnTheScreen);
    document.getElementById("word").innerHTML = wordOnTheScreen;
    winOrLoseCheck();
}

function winOrLoseCheck()
{
    if (!(wordOnTheScreen.includes('_')))
    {
        alert ("you won congratulations");
    }

    if (numberOfWrongGuesses == 6)
    {
        alert("you lost better luck next time");
    }
}