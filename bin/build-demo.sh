cat ./public/index.html | sed 's#</head>#<script src="./easycredit-merchant.js"></script>\n</head>#g' \
  > dist/index.html
