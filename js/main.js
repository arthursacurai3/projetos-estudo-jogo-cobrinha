// ultimo pedaço vira o primeiro desta forma não precisa alterar os pedaços do meio
(function init(){
    let $cobra = document.getElementsByClassName('cobra')
    let $board = document.querySelector('.board')
    let $food = document.getElementsByClassName('food')
    let $record = document.querySelector('.record')
    let $points = document.querySelector('.points')
    let actualDirection = 'ArrowRight'
    let cobraSize = 1
    let pts = 0
    let lastPts = 0
    let _youLoose = false

    let boardWidth = $board.offsetWidth
    let boardHeight = $board.offsetHeight
    let intervalo = 300

    const directions = {
        ArrowUp : [0,-10,'y'],
        ArrowDown : [0,10,'y'],
        ArrowRight : [10,0,'x'],
        ArrowLeft : [-10,0,'x']
    }

    let arrCobra = []

    function novoPedaco(left, top){
        const $novoPedaco = document.createElement('div')
        $novoPedaco.className = 'cobra'
        $novoPedaco.setAttribute('style',`left: ${left}px; top:${top}px` )

        const novoPedacoObj = {
            left: left,
            top: top
        }
        arrCobra.push(novoPedacoObj)
        $board.append($novoPedaco)
        cobraSize = $cobra.length
    }

    function init(){
        novoPedaco(250,250);
        novoPedaco(240,250);
        novoPedaco(230,250);
        getPts()

        showPoints(0)

        lastPts == 0 || lastPts == null ? atualizarRecorde(0) : atualizarRecorde(lastPts);
        if(_youLoose == true){
            _youLoose == false
        }
    }

    init()

    window.addEventListener('keydown',function(e){
        if(directions[e.key][2] !== directions[actualDirection][2]){
            actualDirection = e.key;
        } else{
            return
        }
    })
    
    function move(){
        if(_youLoose === true){
            return
        }
        let left = directions[actualDirection][0]
        let top = directions[actualDirection][1]

        if(left > 0){
            if(arrCobra[0].left == boardWidth - left){
                arrCobra[0].left = 0
            } else{
                arrCobra[0].left += left;
            }
        } else if (left < 0){
            if(arrCobra[0].left == 0){
                arrCobra[0].left = boardWidth + left
            } else{
                arrCobra[0].left += left;
            }
        }

        if(top > 0){
            if(arrCobra[0].top == boardHeight - top){
                arrCobra[0].top = 0
            } else{
                arrCobra[0].top += top;
            }
        } else if (top < 0){
            if(arrCobra[0].top == 0){
                arrCobra[0].top = boardHeight + top
            } else{
                arrCobra[0].top += top;
            }
        }
        
        [...$cobra].forEach((el,idx) => {
            if(idx !== 0 && $cobra[0].offsetLeft === el.offsetLeft && $cobra[0].offsetTop === el.offsetTop){
                _youLoose = true
                youLoose()
            }
        })

        atualizaPosicao(arrCobra[0].left, arrCobra[0].top)

        if($food.length > 0 && $cobra[cobraSize-1].offsetLeft === $food[0].offsetLeft && $cobra[cobraSize-1].offsetTop === $food[0].offsetTop){
            novoPedaco($food[0].offsetLeft, $food[0].offsetTop)
            $food[0].remove();
            pts++
            showPoints(pts)
            if(pts > lastPts){
                atualizarRecorde(pts)
            }
            if (intervalo != 100) {
                intervalo = parseInt(intervalo * 0.9)
            }
        } 
        if(intervalo < 100){
            intervalo = 100
            timer = setInterval(move,100)
        } else if (intervalo != 100) {
            timer = setTimeout(move, intervalo) 
        }
    }
    let timer = setTimeout(move, intervalo)
    
    function novoPedaco(left, top){
        const $novoPedaco = document.createElement('div')
        $novoPedaco.className = 'cobra'
        $novoPedaco.setAttribute('style',`left: ${left}px; top:${top}px` )
    
        const novoPedacoObj = {
            left: left,
            top: top
        }
        arrCobra.push(novoPedacoObj)
        $board.append($novoPedaco)
        cobraSize = $cobra.length
    }
    
    function novaComida(){
        if($food.length === 0){
            let left = (Math.trunc(Math.random()*49.99))*10;
            let top = (Math.trunc(Math.random()*49.99))*10;
    
            const $novaComida = document.createElement('span')
            $novaComida.className = 'food'
            $novaComida.setAttribute('style',`left: ${left}px; top:${top}px; width: 10px; height: 10px; background: yellow; border-radius: 100%; position: absolute;`)
            $board.append($novaComida)
        }
    }
    
    setInterval(novaComida,1000)
    // direcao que a cobra esta indo, última seta do teclado (direcao inicial vai ser aleatoria)
    
    // 
    function atualizaPosicao(left, top){
        $cobra[cobraSize - 1].setAttribute('style',`left: ${left}px; top:${top}px;`)
        $board.insertBefore($cobra[cobraSize - 1],$cobra[0])
        $cobra[0].style.border = '2px solid white'
        $cobra[0].style.zIndex = '1'
        $cobra[1].style.border = ''
        $cobra[0].style.zIndex = ''
    }
    
    function getPts(){
        lastPts = localStorage.getItem('recorde')
    }

    function showPoints(points){
        $points.textContent = 'Pontuação: ' + points
    }

    function atualizarRecorde(points){
        $record.textContent = 'Recorde: ' + points
        localStorage.setItem('recorde', points)
    }
    // returna objeto cobra com posição XY do ultimo pedaço

    function youLoose(){
        console.log($board.innerHTML)
        $board.outerHtml = ''
        console.log($board.innerHTML)
        $cobra.innerHtml=''
        arrCobra = []
        console.log(timer)
        clearInterval(timer)
        console.log(timer)
        alert('Você perdeu')
        pts = 0
        init()
        timer = setTimeout(move, 300)
        showPoints(pts)
    }

})();



