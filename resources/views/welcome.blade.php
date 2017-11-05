<!DOCTYPE HTML>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Memory Admin</title>
        <!-- Latest compiled and minified CSS & JS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>    

        <div class="container">
             <div class="col-md-6">
                <table class="table table-striped">
                    <tbody>
                        <tr>
                            <td>Nº total de cópias impressas:</td>
                            <td>{{$countAllRequests}}</td>
                        </tr>
                        <tr>
                            <td>Média diária de cópias impressas por mês:</td>
                            <td>{{$dailyRequestsByMonth}}</td>
                        </tr>
                        <tr>
                            <td>Percentagem de cópias impressas a cor vs preto e branco:</td>
                            <td>{{$colourVsBlack}}%</td>
                        </tr>  
                        <tr>
                            <td>Nº de pedidos em espera:</td>
                            <td>{{$countAllRequestsToDo}}</td>
                        </tr>
                        <tr>
                            <td>Utilizador com mais pedidos:</td>
                            <td>{{$highestUser}}</td>
                        </tr>
                        <tr>
                            <td>Nº de cópias impressas hoje ({{$actualDay}}):</td>
                            <td>{{$dailyRequests}}</td>
                        </tr>
                    </tbody>
                </table>
                <br><br>
            </div>
            
        <script src="//code.jquery.com/jquery.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    </body>
</html>