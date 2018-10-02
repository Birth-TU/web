function mute(){
    player = document.getElementById("player");
    player.muted = !player.muted;
    if(player.muted){
        document.getElementById("mute").innerText = "Unmute";
    }else{
        document.getElementById("mute").innerText = "Mute";
    }
}