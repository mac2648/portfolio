window.onload = (event) =>{
  showGames()
};

function showGames()
{
  fetch("https://lime-faithful-hippo.cyclic.app/api/games")
  .then(function(response){
    return response.json();
  })
  .then(function (gameInformation){
    console.log(gameInformation);
    var tableCode = 
    "<table>\
    <tr>\
        <th>games</th><th> Platform</th>\
    </tr>";
    gameInformation.forEach(function(currentGame)
    {
        tableCode += 
        `<tr>\
            <td><a style="color:blue" onclick="goToLeaderboard(${currentGame.id})">${currentGame.GameName}</a></td>\
            <td>${currentGame.Platform}</td>\
        </tr>`;
    })

    tableCode+= "</table>";

    document.getElementById("GameTable").innerHTML = tableCode;
  });
}

function goToAddGame(){
  document.getElementById("gamePage").style = "display:none";
  document.getElementById("addGamePage").style = "display:inline";
  document.getElementById("leaderboardPage").style = "display:none";
  document.getElementById("addLeaderboardPage").style = "display:none";
}

function submitGame(){
    let gameName = document.getElementById("gameName").value;
    let gamePlatform = document.getElementById("gamePlatform").value;

    gameName = gameName.trim();
    gamePlatform = gamePlatform.trim();


    if (gameName == null || gameName == "" || gamePlatform == null || gamePlatform == "")
    {
        document.getElementById("errorMessageGame").innerHTML = "Please enter";
        if(gameName == null || gameName == "")
        {
            document.getElementById("errorMessageGame").innerHTML += " a game name";
        }
        if(gamePlatform == null || gamePlatform == "")
        {
            if (document.getElementById("errorMessageGame").innerHTML == "Please enter a game name")
            {
                document.getElementById("errorMessageGame").innerHTML += " and the platform";
            }
            else
            {
                document.getElementById("errorMessageGame").innerHTML += " the game platform";
            }
            
        }
    }else{
        var data = `{"name":"${gameName}","platform":"${gamePlatform}"}`;
        fetch("https://lime-faithful-hippo.cyclic.app/api/games",{
            method:"POST",
            body: data,
            headers: {"Content-type":"application/json; charset=UTF-8"}
        })
        .then((response)=> response.json())
        .then((jsonData)=>{
            document.getElementById("errorMessageGame").innerHTML = jsonData.message
            if (jsonData.message == "OK"){
              document.getElementById("errorMessageGame").innerHTML = "";
              goToGames();
            }
        })
        .catch((errorsReturned)=>
        {
            document.getElementById("errorMessageGame").innerHTML = errorsReturned;
        })
    }
}

function goToGames()
{
  document.getElementById("gamePage").style = "display:inline";
  document.getElementById("addGamePage").style = "display:none";
  document.getElementById("leaderboardPage").style = "display:none";
  document.getElementById("addLeaderboardPage").style = "display:none";
  showGames();
}


function goToLeaderboard(gameShowedId)
{
  document.getElementById("gamePage").style = "display:none";
  document.getElementById("addGamePage").style = "display:none";
  document.getElementById("leaderboardPage").style = "display:inline";
  document.getElementById("addLeaderboardPage").style = "display:none";
  showLeaderBoardPage(gameShowedId);
}

function showLeaderBoardPage(gameId)
{
  link = `https://lime-faithful-hippo.cyclic.app/api/leaderboard/${gameId}`;
  fetch(link)
  .then(function(response){
      return response.json();
  })
  .then(function (leaderboardInfo){

      console.log(leaderboardInfo);
      var tableCode = 
      `<table>\
      <tr>\
          <th>player</th><th>time</th><th>score</th>\
      </tr>`;

      leaderboardInfo.Leaderboard.forEach(function(currentplayer)
      {
          tableCode += 
          `<tr>\
              <td>${currentplayer.Player}</td>\
              <td>${currentplayer.Time}</td>\
              <td>${currentplayer.Score}</td>\
          </tr>`;
      })
      tableCode+= `</table>\
      <br>\
        <button onclick="goToAddLeader(${gameId})">addPlayer</button>\
        <br><br>\
        <button class="goBackToGames" onclick="goToGames()">go back to games</button>\
      `;
      console.log(tableCode);

      document.getElementById("leaderTable").innerHTML = tableCode;
  });
};

function goToAddLeader(gameId)
{
  document.getElementById("gamePage").style = "display:none";
  document.getElementById("addGamePage").style = "display:none";
  document.getElementById("leaderboardPage").style = "display:none";
  document.getElementById("addLeaderboardPage").style = "display:inline";
  showAddLeaderPage(gameId);
}

function showAddLeaderPage(idGame)
{
  document.getElementById("addLeaderboardPage").innerHTML = 
  `<form><label for="player">Player</label>\
        <input type="text" id="player">\
        <br>\
        <label for="score">score</label>\
        <input type="number" id="score">\
        <br>\
        <label for="time">time</label>\
        <input type="text" id="time">\
        <br><br>\
        <input class="button" type="button" onclick="submitNewPlayer(${idGame})" value="submit">\
        <br><br>\
        <p id="errorMessage" style="color: red;"></p></form>\
        <button class="goBackToGames" onclick="goToLeaderboard(${idGame})">go back to leaderboard</button>`
}

function submitNewPlayer(idGameShowed){
    let playerName = document.getElementById("player").value;
    let playerScore = document.getElementById("score").value;
    let time = document.getElementById("time").value;

    playerName = playerName.trim();
    time = time.trim();
    console.log(`Time is ${time}`);

    if (time == "")
    {
        time = null;
    }
    if (playerScore == "")
    {
        playerScore = null;
    }

    console.log(`Time is ${time}`);

    const howTimeLookLike = /^[0-9]+:[0-9]{2}:[0-9]{2}:[0-9]{2}$/;
    validTime = howTimeLookLike.test(time);
    console.log(validTime);

    if (time == null || validTime == true)
    {
        if ((playerName == null || playerName == "") || ((playerScore == null || playerScore == "") && (time == null || time == "")))
        {
            document.getElementById("errorMessage").innerHTML = "Please enter";
            if(playerName == null || playerName == "")
            {
                document.getElementById("errorMessage").innerHTML += " a player name";
            }
            if(((playerScore == null || playerScore == "") && (time == null || time == "")))
            {
                if (document.getElementById("errorMessage").innerHTML == "Please enter a player name")
                {
                    document.getElementById("errorMessage").innerHTML += " and a time or a score";
                }
                else
                {
                    document.getElementById("errorMessage").innerHTML += " a time or a score";
                }
                
            }
        }
        else
        {
            if (time == null)
            {
                var data = `{"gameID":"${idGameShowed}","player":"${playerName}","score":${playerScore},"time":${time}}`;
            }else{
                var data = `{"gameID":"${idGameShowed}","player":"${playerName}","score":${playerScore},"time":"${time}"}`;
            }

            fetch(`https://lime-faithful-hippo.cyclic.app/api/leaderboard/${idGameShowed}`,{
                method:"POST",
                body: data,
                headers: {"Content-type":"application/json; charset=UTF-8"}
            })

            .then((response)=> response.json())

            .then((jsonData)=>{
                document.getElementById("errorMessage").innerHTML = jsonData.message;
                if (jsonData.message == "ok"){
                  document.getElementById("errorMessage").innerHTML = "";
                  goToLeaderboard(idGameShowed)
                }
            })

            .catch((errorsReturned)=>
            {
                document.getElementById("errorMessage").innerHTML = errorsReturned;
            })

        }
    }else{
        document.getElementById("errorMessage").innerHTML = "please enter time in the following format xx:xx:xx:xx";
    }
}

function goToHTMLPortifolio()
{
    window.location.href = "htmlPortifolio.html";
}

function goToIndex()
{
    window.location.href = "index.html";
}

function goToBlenderPortforio()
{
    window.location.href = "blender_portfolio.html";
}