/**
    사진 -> Photo Folder
    동영상 -> Video Folder
    aae, png -> Captured Folder
    나머지 -> etc Folder
    보정사진(IMG_E~)이 있을 경우 원본 사진 -> Duplicated Folder
**/
const fs = require('fs');
const path = require('path');
const pathPrefix = '/Users/csm/Desktop/이것저것/STUDY/';

const photoExt = ['jpg','png', 'jpeg'];         // 사진 확장자
const videoExt = ['mov', 'mp4'];                // 비디오 확장자
const capturedExt = ['aae', 'png'];             // 캡쳐 확장자

// 1. node 실행 파라미터에 입력한 폴더의 이름으로 경로 설정
// 경로 : /Users/csm/Desktop/이것저것/STUDY/test
const workingFolder = process.argv[2];
const folderPath = path.join(pathPrefix, workingFolder);

if(!workingFolder || !fs.existsSync(folderPath)){
    console.error('폴더 경로를 입력해주세요!');
    return;
}

// 2. 폴더 생성
const photoPath = path.join(folderPath, 'photo');
const videoPath = path.join(folderPath, 'video');
const capturedPath = path.join(folderPath, 'captured');
const duplicatedPath = path.join(folderPath, 'duplicated');
const etcPath = path.join(folderPath, 'etc');
const folderPaths = [photoPath, videoPath, capturedPath, duplicatedPath, etcPath];

folderPaths.forEach((path) => {
    !fs.existsSync(path) && fs.mkdirSync(path);
    // if(fs.existsSync(path)){
    //     return
    // }else{
    //     fs.mkdirSync(path);
    // }
})

// 3. 해당 폴더 내의 파일들을 읽는다.
fs.promises
    .readdir(folderPath)
    .then((datas) => {
        // 파일, 폴더 중 파일만
        let files = datas.filter((data) => {
            if(data.split('.').length > 1) return data;
        });
        fileMover(files);
    })
    .then(()=>duplicated())
    .catch(console.log);

// 4. 파일 확장자 별 파일 이동
function fileMover(datas){
    datas.forEach((data) => {
        let ext = data.split('.')[1].toLowerCase();
        if(photoExt.includes(ext)){
            fs.renameSync(path.join(folderPath, data), path.join(photoPath, data));
            console.log(`${data} 파일 이동 완료.`);
            return;
        }

        if(videoExt.includes(ext)){
            fs.renameSync(path.join(folderPath, data), path.join(videoPath, data));
            console.log(`${data} 파일 이동 완료.`);
            return;
        }

        if(capturedExt.includes(ext)){
            fs.renameSync(path.join(folderPath, data), path.join(capturedPath, data));
            console.log(`${data} 파일 이동 완료.`);
            return;
        }

        else{
            fs.renameSync(path.join(folderPath, data), path.join(etcPath, data));
            console.log(`${data} 파일 이동 완료.`);
            return;
        }
    })
}


function duplicated(){
    fs.promises
        .readdir(photoPath)
        .then((photos)=>{
            photos.forEach((photo)=>{
                const edited = `IMG_E${photo.split('_')[1]}`;
                photos.find((f)=>{f.includes(edited)})
                
            })
        })
}