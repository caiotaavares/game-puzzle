# game-puzzle
Este código JavaScript implementa um algoritmo de resolução de um quebra-cabeça deslizante (como o jogo 8-puzzle) usando uma heurística gulosa (greedy heuristic). O quebra-cabeça é uma grade 3x3 com peças numeradas de 1 a 8 e um espaço em branco, onde o objetivo é reorganizar as peças para que elas estejam em ordem crescente, com o espaço em branco na última posição.

## Eurística 1
A eurística 1 foi implementada sobre o algoritmo de busca gulosa (Greedy). Um algoritmo guloso constrói a solução sempre tomando uma decisão que parece a melhor localmente, esperando que esta leve a solução ótima globalmente. Portanto, eles são incisivos em suas decisões, não voltam atrás em uma decisão tomada, e sim constroem a solução diretamente. Por esta razão, em alguns casos, soluções gulosas funcionam e são curtas. Mas problemas que envolvem este paradigma devem conter essas duas características(segundo o CP3):
* Possui subestruturas ótimas: A solução ideal para o problema contém soluções ótimas para os subproblemas.
* Possui a característica gulosa: Se fizermos uma escolha que pareça a melhor localmente e continuarmos a resolver o problema, chegaremos à solução ideal. E nunca teremos que reconsiderar uma decisão anterior.
Aqui a decisão do melhor movimento a ser feito é tomado com base nos movimentos dos filhos, ou seja, qual filho implementa o movimento que pode deixar a peça em questão mais próxima da sua posição correta, a distância é calculada através da heurística de distância de Manhattan.
De maneira geral, a a cada 100 jogadas distintas a média de movimentos necessários para solucionar o quebra cabeça foi de 459.

## Eurística 2
A eurística 2 foi implementada sobre a mesma lógica da primeira, utilizando o algoritmo de busca gulosa (Greedy). Mas aqui a decisão de qual movimento deve ser realizado é realizada através da análise do melhor neto (Filho do filho a ser analizado). isso permite o algoritmo analisar um maior número de jogadas possíveis antes para tomar a melhor decisão, ainda utilizando a eurística de distância de Manhattan para encontrar a distância entre as peças.

A eurística 2 teve um desempenho melhor do que a primeira (como esperado), que foi de para cada 100 jogadas, a média de movimentos para resolução foi de 241.

![Screenshot from 2023-10-24 17-55-56](https://github.com/caiotaavares/game-puzzle/assets/69085383/0e4dd73d-025f-4ba6-ad4a-4c5b3112d2fa)
