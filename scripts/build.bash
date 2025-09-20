#!/usr/bin/env bash
set -eu

project_dir=$(cd $(dirname ${BASH_SOURCE})/..; pwd)
build_dir=${project_dir}/build
target=${1:-firefox}

build()
{
  echo "Build start for ${target}."

  rm -fr ${build_dir}/${target}
  mkdir -p ${build_dir}/${target}
  cp -r ${project_dir}/content_scripts ${build_dir}/${target}/
  cp -r ${project_dir}/icons ${build_dir}/${target}/
  cp -r ${project_dir}/popup ${build_dir}/${target}/

  if [[ "${target}" = "chrome" ]]; then
    cp -r ${project_dir}/background ${build_dir}/${target}/
  fi

  cp ${project_dir}/manifests/manifest.${target}.json ${build_dir}/${target}/manifest.json
  cp ${project_dir}/node_modules/webextension-polyfill/dist/browser-polyfill.min.js ${build_dir}/${target}/

  npx web-ext build -c ${project_dir}/web-ext-config.mjs --source-dir ${build_dir}/${target} --artifacts-dir ${project_dir}/web-ext-artifacts/${target}
}

case "${target}" in
  firefox|chrome)
    build
    ;;
  *)
    echo "Target must be firefox or chrome but ${target} was specified."
    exit 1
esac
