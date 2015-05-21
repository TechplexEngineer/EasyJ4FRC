#!/usr/bin/python2.7
import sys, re

code = ''.join(sys.stdin.readlines())

LICENSE = re.compile("""/\\*

 [\w ]+

 (Copyright \\d+ Google Inc.)
 (?:https://developers.google.com/blockly/|https://blockly.googlecode.com/)

 Licensed under the Apache License, Version 2.0 \(the "License"\);
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
\\*/""", re.MULTILINE)
code = re.sub(LICENSE, r'\n// \1  Apache License 2.0', code)

print code