precision mediump float;

uniform sampler2D uTexture;
varying vec2 vUv;
varying float vElevation;


void main(){
    vec4 flag = texture2D(uTexture, vUv); 
    flag.rbg += vElevation * 0.1 + 0.1;
    gl_FragColor = flag;
}