#!/bin/bash

cd `dirname $0`

# Copy static files
mkdir -p www
cp -vrf ./static www/static

# Generate pages
find pages/ -name '*.html' | while read page; do
    output=`realpath --relative-to $PWD/pages $page`
    output_dir=`dirname $output`
    mkdir -p www/$output_dir
    extra_headers=''
    extra_footers=''
    if [[ "$page" = *"blog"* ]]; then
         extra_headers="$extra_headers components/blog-header.html"
	 extra_footers="$extra_footers components/blog-footer.html"
    fi
    cat components/header.html $extra_headers $page $extra_footers components/footer.html > www/$output
done

# Build the blog index
mkdir -p www/blog
cat components/header.html > www/blog/index.html
cat components/blog-header.html >> www/blog/index.html
echo "<strong class=\"red\">Articles</strong><br />" >> www/blog/index.html
echo "<ul>" >> www/blog/index.html
find pages/blog/ -name '*.html' | sort -hr | while read page; do
    base=`basename $page .html`
    echo "<li><a href=\"/blog/${base}\">${base}</a></li>" >> www/blog/index.html
done
echo "</ul>" >> www/blog/index.html
cat components/blog-footer.html >> www/blog/index.html
cat components/footer.html >> www/blog/index.html
