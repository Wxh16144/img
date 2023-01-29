# img

> 一个自用的图片网站 [online](//wxh16144.github.io/img)

```bash
curl -OL https://wxh16144.github.io/img/[b-w].jpg
```

```html
<img src="//wxh16144.github.io/img/[b-w].jpg" />
```

```markdown
![picture](//wxh16144.github.io/img/[b-w].jpg)
```

## Docker

```bash
git clone --depth 1 https://github.com/Wxh16144/img.git && cd img &&\
docker-compose up -d
```

## Build Docker Image

```bash
docker build -t wxh16144/img:[TagName] . # ← 注意这里有个 "."
```
