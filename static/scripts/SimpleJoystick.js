var Html_JoystickMain;
var Html_Joystick;

var JoystickReady = false;

var _JoystickMainWidth = 0;
var _JoystickMainHeigth = 0;

var _JoystickWidth = 0;
var _JoystickHeigth = 0;

var _PositionX = 0;
var _PositionY = 0;

var _JoystickMax = 0;
var _Joystick_isMousedown = false;

function LoadJoystick()
{
    Html_JoystickMain = document.getElementById("JoystickMain");
    Html_Joystick = document.getElementById("Joystick");

    Html_JoystickMain.addEventListener('touchstart', Joystick_OnTouchStart, false);
    Html_JoystickMain.addEventListener('touchmove', Joystick_OnTouchMove, false);
    Html_JoystickMain.addEventListener('touchcancel', Joystick_OnTouchCancel, false);
    Html_JoystickMain.addEventListener('touchend', Joystick_OnTouchEnd, false);

    Html_JoystickMain.addEventListener('mousedown', Joystick_OnMouseDown, false);
    Html_JoystickMain.addEventListener('mousemove', Joystick_OnMouseMove, false);
    Html_JoystickMain.addEventListener('mouseup', Joystick_OnMouseUp, false);

    console.log("[INFO] Joystick Ready");

    _JoystickMainHeigth = $( "#JoystickMain" ).height();
    _JoystickMainWidth = $( "#JoystickMain" ).width();

    _JoystickHeigth = $( "#Joystick" ).height();
    _JoystickWidth = $( "#Joystick" ).width();

    _JoystickMax = _JoystickMainWidth /2;

    $( "#Joystick" ).css( "left", (_JoystickMainWidth/2 - _JoystickWidth/2).toString() ) ;
    $( "#Joystick" ).css( "top",  (_JoystickMainHeigth/2 - _JoystickHeigth/2).toString() ) ;

    JoystickReady = true;
}

function Joystick_OnTouchStart(event)
{

}

function Joystick_OnMouseDown(event)
{
    console.log("Down");
    _Joystick_isMousedown = true;
}

function Joystick_OnMouseUp(event)
{
    console.log("Up");
    $( "#Joystick" ).css( "left", (_JoystickMainWidth/2 - _JoystickWidth/2).toString() ) ;
    $( "#Joystick" ).css( "top",  (_JoystickMainHeigth/2 - _JoystickHeigth/2).toString() ) ;

    _PositionX = 0;
    _PositionY = 0;

    _Joystick_isMousedown = false;
}

function Joystick_OnMouseMove(event)
{
    if (_Joystick_isMousedown)
    {
        var tmpWidth = (event.clientX  - $('#JoystickMain').offset().left - _JoystickWidth /2);
        var tmpHeigth =  (event.clientY  - $('#JoystickMain').offset().top - _JoystickHeigth /2);

        if(tmpHeigth > _JoystickMainHeigth - _JoystickHeigth)
        {
            tmpHeigth =  _JoystickMainHeigth - _JoystickHeigth;
        }

        if(tmpWidth >  _JoystickMainWidth - _JoystickWidth)
        {
            tmpWidth = _JoystickMainWidth - _JoystickWidth;
        }

        if(tmpHeigth < 0)
        {
            tmpHeigth = 0;
        }

        if(tmpWidth < 0)
        {
            tmpWidth = 0;
        }

        $( "#Joystick" ).css( "left",  tmpWidth.toString() ) ;
        $( "#Joystick" ).css( "top",  tmpHeigth.toString() ) ;

        _PositionX = event.clientX  - $('#JoystickMain').offset().left;
        _PositionY = event.clientY  - $('#JoystickMain').offset().top;


        if( _PositionX > _JoystickMainHeigth)
        {
            _PositionX = _JoystickMainHeigth;
        }

        if( _PositionX <   0)
        {
            _PositionX = 0;
        }

        if( _PositionY > _JoystickMainWidth)
        {
            _PositionY = _JoystickMainWidth;
        }

        if( _PositionY <  0)
        {
            _PositionY = 0;
        }


        _PositionY -= _JoystickMax;
        _PositionX -= _JoystickMax;
    }

}

function Joystick_OnTouchEnd()
{

    _PositionX = 0;
    _PositionY = 0;
}

function Joystick_OnTouchCancel()
{

    _PositionX = 0;
    _PositionY = 0;

    console.warn("[WARN] touchcancel event -> Joystick position reset");
}

function Joystick_OnTouchMove()
{
    var tmpHeigth = (event.touches[0].clientX  - $('#JoystickMain').offset().left - _JoystickHeigth /2);
    var tmpWidth =  (event.touches[0].clientY  - $('#JoystickMain').offset().top - _JoystickWidth /2);

    if(tmpHeigth > _JoystickMainHeigth - _JoystickHeigth)
    {
        tmpHeigth =  _JoystickMainHeigth - _JoystickHeigth;
    }

    if(tmpWidth >  _JoystickMainWidth - _JoystickWidth)
    {
        tmpWidth = _JoystickMainWidth - _JoystickWidth;
    }

    if(tmpHeigth < 0)
    {
        tmpHeigth = 0;
    }

    if(tmpWidth < 0)
    {
        tmpWidth = 0;
    }

    $( "#Joystick" ).css( "left",  tmpWidth.toString() ) ;
    $( "#Joystick" ).css( "top",  tmpHeigth.toString() ) ;

    _PositionX = event.touches[0].clientX  - $('#JoystickMain').offset().left;
    _PositionY = event.touches[0].clientY  - $('#JoystickMain').offset().top;


    if( _PositionX > _JoystickMainHeigth)
    {
        _PositionX = _JoystickMainHeigth;
    }

    if( _PositionX <   0)
    {
        _PositionX = 0;
    }

    if( _PositionY > _JoystickMainHeigth)
    {
        _PositionY = _JoystickMainHeigth;
    }

    if( _PositionY <  0)
    {
        _PositionY = 0;
    }


    _PositionY -= _JoystickMax;
    _PositionX -= _JoystickMax;
}

function GetJoystick_X()
{
    if(JoystickReady)
    {
        return _PositionX;
    }
    else
    {
        console.warn("[WARN] GetJoystick_X -> JoystickReady is set to False - Please launch LoadJoystick function");
    }

}

function GetJoystick_Y()
{
    if(JoystickReady)
    {

        return _PositionY;
    }
    else
    {
        console.warn("[WARN] GetJoystick_Y -> JoystickReady is set to False - Please launch LoadJoystick function");
    }
}

function stopJoystick()
{
    JoystickReady = false ;
    var jsonToSend = new Object() ;

    jsonToSend.stopval = 400 ;

    var jsonString = JSON.stringify(jsonToSend, null, '\t');
    console.log("i stop joystick");
    $.ajax({
            url: '/autoS/',
            type: 'POST',
            dataType: 'application/json;charset=UTF-8',
            data: jsonString,
            statusCode: {
                200: function () {
                    console.log("program finish with no error !");
                }
            }
        });
}