#!/bin/sh
# Negative controls for code/vibe. Each file under control/vibe perturbs true theorems (a wrong table, a wrong sign, a
# wrong constant) and every one of its rules must be REFUSED by the kernel. A control that compiles means a law in the
# library is vacuous. Each file is built alone with the modules it imports, in a small package under tmp/runs, so
# `term make` stays sequential and prints every refusal.
#
# Expected refusals: law 17, eisenstein 5, coin 2, algebra 4, group 7, geometry 8, dynamics 6, boost 1.
#
# usage: sh control/run.sh
root=$(cd "$(dirname "$0")/.." && pwd)
line=$root/../term/host/line.js

run() {
  control=$1
  shift
  pkg=$root/tmp/runs/control-$control-$$
  mkdir -p $pkg/code/vibe $pkg/code/control
  ln -sfn $root/code/atom $pkg/code/atom
  printf '\ndeck @term/seed\n  head <control>\n  mark <0.0.2>\n  sort tool\n  lock mit\n  bear ./code\n' > $pkg/deck.tree
  ln -sf $root/control/vibe/$control.tree $pkg/code/control/$control.tree
  for name in "$@"; do
    ln -sf $root/code/vibe/$name.tree $pkg/code/vibe/$name.tree
  done
  (cd $pkg && node $line make > make.log 2>&1)
  refused=$(grep -c -e '^kink' $pkg/make.log)
  echo "$refused refused  $control"
}

run law-control law tone
run eisenstein-control eisenstein
run coin-control eisenstein coin
run algebra-control law tone eisenstein coin role heisenberg
run group-control law tone role heisenberg hurwitz turn dock hopf
run geometry-control warp design honeycomb growth forced-dock-24-cell
run dynamics-control law tone knit line clifford
run boost-control boost
