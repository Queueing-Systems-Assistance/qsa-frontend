#!/bin/bash

IS_CONTAINER_FIRST_RUN="IS_CONTAINER_FIRST_RUN"
if [ ! -e $IS_CONTAINER_FIRST_RUN ]; then
    touch $IS_CONTAINER_FIRST_RUN
    # Update base href
    echo "Updating base href [${BASE_HREF}]"
    updatedBaseUrl=$(echo "${BASE_HREF}" | sed --expression='s/\//\\\//g')
    contentOfIndexHtml=$(cat /usr/share/nginx/html/index.html)
    updateContentOfIndex=$(echo "${contentOfIndexHtml}" | sed --expression="s/<base href=\"\/\">/<base href=\"${updatedBaseUrl}\">/g")
    rm /usr/share/nginx/html/index.html
    echo "${updateContentOfIndex}" > "/usr/share/nginx/html/index.html"
    chmod 755 /usr/share/nginx/html/index.html
    # Update calculator and formula handler URL
    jsFileName=$(find /usr/share/nginx/html/ -name 'main.*.js' -exec basename {} \;)
    echo "Updating [/usr/share/nginx/html/${jsFileName}]"
    echo "Updating api url [${BASE_API_URL}]"
    updatedApiUrl=$(echo "${BASE_API_URL}" | sed --expression='s/\//\\\//g')
    sed -i "s/qsa.inf.unideb.hu\/prod\/api/qsa.inf.unideb.hu${updatedApiUrl}/" /usr/share/nginx/html/"${jsFileName}"
fi

# Start nginx
echo "Starting nginx"
nginx -g "daemon off;"
