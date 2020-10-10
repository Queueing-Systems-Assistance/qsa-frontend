#!/bin/bash

IS_CONTAINER_FIRST_RUN="IS_CONTAINER_FIRST_RUN"
if [ ! -e $IS_CONTAINER_FIRST_RUN ]; then
    touch $IS_CONTAINER_FIRST_RUN
    # Update base href
    indexHtmlFileName="/usr/share/nginx/html/index.html"
    echo "Updating base href [${BASE_HREF}] at [${indexHtmlFileName}]"
    updatedBaseUrl=$(echo "${BASE_HREF}" | sed --expression='s/\//\\\//g')
    contentOfIndexHtml=$(cat ${indexHtmlFileName})
    updateContentOfIndex=$(echo "${contentOfIndexHtml}" | sed --expression="s/<base href=\"\/\" \/>/<base href=\"${updatedBaseUrl}\" \/>/g")
    echo "Updated [${indexHtmlFileName}] content"
    echo updateContentOfIndex
    rm ${indexHtmlFileName}
    echo "${updateContentOfIndex}" > "${indexHtmlFileName}"
    chmod 755 ${indexHtmlFileName}
    echo "Updated [${indexHtmlFileName}] file"
    cat ${indexHtmlFileName}
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
