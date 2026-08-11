<?php

namespace App\Service;

use LogicException;
use Symfony\Component\HttpFoundation\Request;

class HttpParametersService
{
    const INPUT_FORMAT_JSON = 'json';
    const INPUT_FORMAT_FORM_DATA = 'form-data';

    /**
     * Cette methode permet de extraire les paramètre d'une requete pour etre utilisés dans une requete sql.
     *
     * Elle peut aussi controler les parametres avec des restrictions.
     *
     * @param string[]|null $availableParams
     *
     * @return array<string, mixed>
     */
    public function extractRequestParams(Request $request, ?array $availableParams = null): array
    {
        if (empty($request->query->all())) {
            return [];
        }

        if (!$availableParams) {
            return $request->query->all();
        }

        array_push($availableParams, 'lang');
        $params = [];
        foreach ($request->query->all() as $key => $value) {
            if (!(\in_array($key, $availableParams, true)) && !isset($availableParams[$key])) {
                throw new LogicException("Paramètre : {$key} n'est pas correct vérifier vos paramètres", 200);
            }
            $params[$key] = $value;
        }

        return $params;
    }
}