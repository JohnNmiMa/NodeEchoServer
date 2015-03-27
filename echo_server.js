var http = require("http");

var server = http.createServer(function(request, response) {
    var url = request.url.replace(/\/$/, ""),
        resobj = {};

    if (url === "/headers") {
        var headers = request.headers;
        response.setHeader('Content-type', 'application/json');
        response.write(JSON.stringify({
            num_headers: Object.keys(request.headers).length,
            header: request.headers
        }))
    } else if (url.indexOf("/headers") > -1) {
        var headerName = url.split("/")[2],
            header = request.headers[headerName];

        resobj[headerName] = header === undefined ? "unknown header" : header;
        response.setHeader('Content-type', 'application/json');
        response.write(JSON.stringify(resobj));
    } else if (url === "/version") {
        resobj.version = request.httpVersion;
        console.log(resobj);
        response.write(JSON.stringify(resobj));
    } else {
        response.write(JSON.stringify({
            help: "Valid echo urls are /headers, /headers/<header-name>, or /version"
        }))
    }
    response.end();
});

server.listen(8080);

